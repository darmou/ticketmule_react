/* eslint no-console:0 */
// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.
//
// To reference this file, add <%= javascript_pack_tag 'application' %> to the appropriate
// layout file, like app/views/layouts/application.html.erb
// eslint-disable-next-line no-undef
//require.context('../images', true);
import React, { createContext, useReducer } from 'react';
import PropTypes from "prop-types";
import { render } from "react-dom";
import App from "../components/App";
import { BrowserRouter } from "react-router-dom";
import "idempotent-babel-polyfill";
import { CookiesProvider } from "react-cookie";
//import "favicons";

import {
    CHECK_LOGIN,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    RECEIVE_TICKET,
    REQUEST_TICKET,
    RECEIVE_TICKETS,
    REQUEST_TICKETS,
    LOGOUT_REQUEST,
} from "../actions";

export const TicketContext = createContext(null);
export const TicketContextProvider = props => {
    const initialState = {
        tickets: null,
        ticket: null,
        user: null
    };

    const reducer = (state, action) => {
        switch (action.type) {
            case LOGIN_REQUEST:
                return {...state, isFetching: true };

            case LOGIN_SUCCESS:
                sessionStorage.setItem("authentication_token", action.user.authentication_token);
                sessionStorage.setItem("email", action.user.email);
                sessionStorage.setItem("username", action.user.username);
                return {...state,
                    isFetching: action.isFetching,
                    isAuthenticated: action.isAuthenticated,
                    user: action.user,
                    lastUpdated: action.receivedAt
                };

            case LOGOUT_SUCCESS:
                sessionStorage.removeItem("authentication_token");
                sessionStorage.removeItem("email");
                sessionStorage.removeItem("username");
                return {...state,
                    isLoggingOut: false,
                    isAuthenticated: false,
                    user: action.user
                };

            case LOGOUT_REQUEST:
                return {
                    ...state,
                    isLoggingOut: true,
                    isAuthenticated: true,
                };

            case CHECK_LOGIN:
                return (state && state.user.authentication_token);

            case RECEIVE_TICKET:
                return {...state, isFetching: true };

            case REQUEST_TICKET:
                return {...state,
                    isFetching: false,
                    ticket: {
                        id: action.ticket.id,
                        text: action.ticket.ticket || action.ticket.text,
                        priority: action.ticket.priority || '',
                    },
                    lastUpdated: action.receivedAt
                };

            case RECEIVE_TICKETS:
                return { ...state, isFetching: false,
                    tickets: action.tickets
                };

            case REQUEST_TICKETS:
                return {...state,
                    isFetching: false,
                    tickets: action.tickets,
                    lastUpdated: action.receivedAt
                };

            default:
                return state;
        }
    };

    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <TicketContext.Provider value={{state, dispatch}}>
            {props.children}
        </TicketContext.Provider>
    );
};

TicketContextProvider.propTypes = {
    children: PropTypes.element.isRequired
};


document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('#root');
    render(
        <TicketContextProvider>
          <CookiesProvider>
            <BrowserRouter>
              <App/>
            </BrowserRouter>
          </CookiesProvider>
        </TicketContextProvider>, container
    );
});
