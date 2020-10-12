import React from 'react';
import {
    Routes,
    Route, useNavigate
} from "react-router-dom";
import styled from "styled-components";
import Login from "./Login";
import Header from "./Header";
import Dashboard from "./Dashboard";
import { withCookies } from 'react-cookie';
import PropTypes from "prop-types";
import { TicketContext } from "../packs/application";
import TicketDash from "./TicketDash";
import TicketNew from "./TicketNew";
import TicketEdit from "./TicketEdit";
import Tickets from "./Tickets";
import TicketStore from "../actions/ticket_store";
import Ticket from "./Ticket";
import TicketControls from "./TicketControls";

function BaseApp ({context}) {
    const navigate = useNavigate();

    React.useEffect(() => {
        if (!context || !context.state.user) {
            if (sessionStorage.getItem("authentication_token")) {
                const user = {
                    email: sessionStorage.getItem("email"),
                    authentication_token: sessionStorage.getItem("authentication_token"),
                    username: sessionStorage.getItem("username")
                };
                context.dispatch({action_fn: TicketStore.setUser, user});
            } else { // Woops no user available navigate to login page
                navigate("/");
            }
        }
    }, [TicketStore]);

    const Dash = (context && context.state.user != null)
        ? Dashboard : Login;


    return (<AppStyled>

        <ContentStyled>
            <Header/>
            <Routes>
                <Route path='/tickets' element={<TicketDash/>}>
                    <Route path='/' element={<Tickets/>} />
                    <Route path='/new' element={<TicketNew/>} />
                    <Route path=':slug' element={<Ticket/>} />
                    <Route path=':slug/edit' element={<TicketEdit/>} />

                </Route>
                <Route path='/' element={<Dash />}/>
            </Routes>
            <RightColumnStyled>
                <TicketControls loggedIn={context && context.state.user != null}/>
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