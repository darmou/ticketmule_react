import React from 'react';
import {
    Routes,
    Route, useNavigate
} from "react-router-dom";
import IdleTimer from "react-idle-timer";
import styled from "styled-components";
import Login from "./Login";
import Header from "./Header";
import Dashboard from "./Dashboard";
import { withCookies } from 'react-cookie';
import PropTypes from "prop-types";
import { TicketContext } from "../packs/application";
import TicketDash from "./Tickets/TicketDash";
import TicketNew from "./Tickets/TicketNew";
import TicketEdit from "./Tickets/TicketEdit";
import Tickets from "./Tickets/Tickets";
import TicketStore from "../actions/ticketStore";
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
import ResetPassword from "./ResetPassword";

const SESSION_TIMEOUT = 300000; //5 mins

function BaseApp ({context}) {
    const navigate = useNavigate();
    const [timeoutValue, setTimeoutValue] = React.useState(SESSION_TIMEOUT);
    const [isTimeout, setIsTimeout] = React.useState(false);
    const { state, dispatch } = context;
    const { user, flashMsg } = state;
    const idleTimer = React.useRef();

    React.useEffect(() => {
        if (!user) {
            if (sessionStorage.getItem("authentication_token")) {
                const theUser = {
                    email: sessionStorage.getItem("email"),
                    authentication_token: sessionStorage.getItem("authentication_token"),
                    username: sessionStorage.getItem("username"),
                    id: sessionStorage.getItem("id")
                };
                dispatch({action_fn: UserStore.setUser, user: theUser});
            } else { // Woops no user available navigate to login page
                navigate("/");
            }
        }
        if (flashMsg) {
            setTimeout(() => {
                dispatch({action_fn: TicketStore.setFlashMsg, flashMsg: null});
            }, TIMEOUT);
        }
    }, [TicketStore, user, flashMsg, dispatch, TIMEOUT]);

    const _onActionOrActive = () => {
        setIsTimeout(false);
    };

    const _onIdle = () => {
        if (isTimeout && user) {
            dispatch({action_fn: UserStore.setUser, user: null});
        } else {
            if (idleTimer.current != null) {
                idleTimer.current.reset();
            }
            setIsTimeout(true);
        }
    };

    const Dash = (user != null)
        ? Dashboard : Login;

    const AppWrapper = (user == null) ? React.Fragment : AResourceStyled;

    return (<AppStyled>
        <IdleTimer
            ref = {ref => idleTimer.current = ref }
            element={document}
            onActive={_onActionOrActive}
            onIdle={_onIdle}
            onAction={_onActionOrActive}
            debounce={250}
            timeout={timeoutValue} />
        <ContentStyled>
            <Header/>
            <AppWrapper>
                {(user == null) ? null : flashMsg}
                <Routes>
                    <Route path='/tickets' element={<TicketDash/>}>
                        <Route path='/' element={<Tickets/>} />
                        <Route path='/new' element={<TicketNew context={context}/>} />
                        <Route path=':slug' element={<Ticket/>} />
                        <Route path=':slug/edit' element={<TicketEdit context={context}/>} />
                    </Route>
                    <Route path='/forgot' element={<Forgot/>}/>
                    <Route path='/reset' element={<ResetPassword/>}/>
                    <Route path='/contacts/*' element={<ContactRoutes/>}/>
                    <Route path='/users/*' element={<UserRoutes/>}/>
                    <Route path='/admin' element={<Admin/>}>
                        <Route path='/' element={<AdminOptions type="group"/>}/>
                        <Route path='/groups' element={<AdminOptions type="group"/>}/>
                        <Route path='/statuses' element={<AdminOptions type="status"/>}/>
                        <Route path='/priorities' element={<AdminOptions type="priority"/>}/>
                        <Route path='/time_types' element={<AdminOptions type="time_type"/>}/>
                        <Route path='/users' element={<AdminUsers/>}/>
                    </Route>
                    <Route path='/' element={<Dash/>}/>
                </Routes>
            </AppWrapper>
            <RightColumnStyled>
                <TicketControls loggedIn={user != null}/>
            </RightColumnStyled>
        </ContentStyled>
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