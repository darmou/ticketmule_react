import React from 'react';
import {
  Switch,
  Route
} from "react-router-dom";
import styled from "styled-components";
import Login from "./Login";
import Footer from "./Footer";
import Header from "./Header";
import Dashboard from "./Dashboard";
import { withRouter } from 'react-router-dom';
import { withCookies } from 'react-cookie';
import { receiveLogin } from "../actions";
import PropTypes from "prop-types";
import { TicketContext } from "../packs/application";
import Tickets from "./Tickets";
import TicketControls from "./TicketControls";

function BaseApp ({context}) {

    React.useEffect(() => {
        if (!context || !context.state.user) {
            if (sessionStorage.getItem("authentication_token")) {

                const user = {
                    email: sessionStorage.getItem("email"),
                    authentication_token: sessionStorage.getItem("authentication_token"),
                    username: sessionStorage.getItem("username")
                };
                context.dispatch(receiveLogin(user));
            }
        }
    });

    const isLoggedIn = new Boolean(context && context.state.user).valueOf();
    const Dash = (isLoggedIn === true)
        ? Dashboard : Login;


    return (<AppStyled>
        <Header/>
        <ContentStyled>
            <Switch>
                <Route exact path='/tickets/new' render={props => <Ticket {...props}/>}/>
                <Route exact path='/tickets' render={props => <Tickets {...props}/>}/>
                <Route exact path='/' render={props => <Dash {...props}/>}/>;
            </Switch>
            <RightColumnStyled>
                <TicketControls loggedIn={isLoggedIn}/>
            </RightColumnStyled>
            <Footer/>
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


export default withCookies(withRouter(App));