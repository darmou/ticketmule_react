import React, { useEffect, useRef, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import IdleTimer from "react-idle-timer";
import styled from "styled-components";
import { SSEProvider } from "react-hooks-sse";
import Login from "./Login";
import Header from "./Header";
import Dashboard from "./Dashboard";
import { withCookies } from 'react-cookie';
import PropTypes from "prop-types";
import { TicketContext } from "../application";
import TicketDash from "./Tickets/TicketDash";
import TicketNew from "./Tickets/TicketNew";
import TicketEdit from "./Tickets/TicketEdit";
import Tickets from "./Tickets/Tickets";
import ResourceStore from "../actions/resourceStore";
import Ticket from "./Tickets/Ticket";
import TicketControls from "./Tickets/TicketControls";
import ContactRoutes from "./Contacts/ContactRoutes";
import UserRoutes from "./Users/UsersRoutes";
import Admin from "./Admin/Admin";
import UserStore from "../actions/userStore";
import AdminOptions from "./Admin/AdminOptions";
import AdminUsers from "./Admin/AdminUsers";
import { TIMEOUT } from "./ComponentLibrary/FlashMessages";
import { AResourceStyled } from "./ComponentLibrary/Resources";
import Forgot from "./Forgot";
import { OptionTypes } from "../types/types";
import ResetPassword from "./ResetPassword";
import { stringToBoolean } from "../utils/displayUtils";
import { queryClient } from "../utils/network";
import { QueryClientProvider } from 'react-query'

const SESSION_TIMEOUT = 300000; //5 mins

function BaseApp ({context}) {
    const navigate = useNavigate();
    const location = useLocation();
    const [isTimeout, setIsTimeout] = useState(false);
    const { state, dispatch } = context;
    const { user, flashMsg } = state;
    const idleTimer = useRef();


    const createSource = () => {
        let myHeaders = {};
        if (user) {
            myHeaders['X-User-Email'] = user.email;
            myHeaders['X-User-Token'] = user.authentication_token;
        }
        return new EventSource("/api/v1/watch", myHeaders);
    };

    useEffect(() => {
        if (!user) {
            if (sessionStorage.getItem("authentication_token")) {
                const theUser = {
                    email: sessionStorage.getItem("email"),
                    authentication_token: sessionStorage.getItem("authentication_token"),
                    username: sessionStorage.getItem("username"),
                    admin: stringToBoolean(sessionStorage.getItem("admin")),
                    id: sessionStorage.getItem("id")
                };
                dispatch({action_fn: UserStore.setUser, user: theUser});
            } else { // Woops no user available navigate to login page if not a public route
                const publicRoutes = ['/','/reset_password', '/forgot'];
                if (!(publicRoutes.includes(location.pathname) || location.pathname.startsWith('/rails'))) {
                    navigate("/");
                }
            }
        }
        if (flashMsg) {
            setTimeout(() => {
                dispatch({action_fn: ResourceStore.setFlashMsg, flashMsg: null});
            }, TIMEOUT);
        }
    }, [ResourceStore, user, flashMsg, dispatch, TIMEOUT]);

    const _onActionOrActive = () => {
        setIsTimeout(false);
    };

    const _onIdle = () => {
        if (isTimeout && user) {
            dispatch({action_fn: UserStore.setUser, user: null});
        } else {
            if (idleTimer.current != null) {
                // @ts-ignore
                idleTimer.current.reset();
            }
            setIsTimeout(true);
        }
    };

    const Dash = (user != null)
        ? Dashboard : Login;

    const AppWrapper = (user == null) ? React.Fragment : AResourceStyled;


    return (<AppStyled>
        <IdleTimer  // @ts-ignore
            ref = {ref => idleTimer.current = ref }
            element={document}
            onActive={_onActionOrActive}
            onIdle={_onIdle}
            onAction={_onActionOrActive}
            debounce={250}
            timeout={SESSION_TIMEOUT} />
        <QueryClientProvider client={queryClient}>
            <SSEProvider source={() => createSource()}>
                <ContentStyled>
                    <Header/>
                    <AppWrapper>
                        {(user == null) ? null : flashMsg}
                        <Routes>
                            <Route path='/tickets' element={<TicketDash/>}>
                                <Route index={true} element={<Tickets/>} />
                                <Route path='new' element={<TicketNew context={context}/>} />
                                <Route path=':slug' element={<Ticket/>} />
                                <Route path=':slug/edit' element={<TicketEdit context={context}/>} />
                            </Route>
                            <Route path='/forgot' element={<Forgot/>}/>
                            <Route path='/reset_password' element={<ResetPassword/>}/>
                            <Route path='/contacts/*' element={<ContactRoutes/>}/>
                            <Route path='/users/*' element={<UserRoutes/>}/>
                            {(user && user.admin) &&
                                <Route path='/admin' element={<Admin/>}>
                                    <Route index={true} element={<AdminOptions type={OptionTypes.GROUP}/>}/>
                                    <Route path='groups' element={<AdminOptions type={OptionTypes.GROUP}/>}/>
                                    <Route path='statuses' element={<AdminOptions type={OptionTypes.STATUS}/>}/>
                                    <Route path='priorities' element={<AdminOptions type={OptionTypes.PRIORITY}/>}/>
                                    <Route path='time_types' element={<AdminOptions type={OptionTypes.TIME_TYPE}/>}/>
                                    <Route path='users' element={<AdminUsers/>}/>
                                </Route>
                            }
                            <Route index={true} element={<Dash/>}/>
                        </Routes>
                    </AppWrapper>
                    <RightColumnStyled>
                        <TicketControls loggedIn={user != null}/>
                    </RightColumnStyled>
                </ContentStyled>
            </SSEProvider>
        </QueryClientProvider>
    </AppStyled>);
}

const AppStyled = styled.div`
  height: 100%;
  color: #333;
  font: 11px/16px Verdana,sans-serif;
`;

const ContentStyled = styled.div`
    padding-bottom: 30px;
`;

const RightColumnStyled = styled.div`
    padding: 15px 15px 15px 0;
    float: right;
    width: 25%;
`;

BaseApp.propTypes = {
    context: PropTypes.object
};

function App() {
    return (
        <TicketContext.Consumer>
            {ticketContext => <BaseApp context={ticketContext}/>}
        </TicketContext.Consumer>);
}


export default withCookies(App);