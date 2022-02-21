// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

//require("@rails/ujs").start();
//require("turbolinks").start();
//require("@rails/activestorage").start();
//require("channels");
//import "./channels"


// Uncomment to copy all static images under ../images to the output folder and reference
// them with the image_pack_tag helper in views (e.g <%= image_pack_tag 'rails.png' %>)
// or the `imagePath` JavaScript helper below.
//
// const images = require.context('../images', true)
// const imagePath = (name) => images(name, true)
//import 'stylesheets/application';
import React, { createContext, useReducer } from 'react';
import PropTypes from "prop-types";
import { render } from "react-dom";
import App from "./components/App";
import { BrowserRouter } from "react-router-dom";
import "idempotent-babel-polyfill";
import { CookiesProvider } from "react-cookie";
import functionReducer, { logReducer } from "function-reducer";

const initialPageInfo  = {
    currentPage: 1,
    resourceCount: null,
    lastPage: null,
    perPage: 10,
    searchString: ""
};

const initialState = {
    tickets: null,
    flashMsg: null,
    ticketPageInfo: initialPageInfo,
    contactPageInfo: initialPageInfo,
    userPageInfo: initialPageInfo,
    contacts: null,
    contact: null,
    ticket: null,
    aUser: null,
    users: null,
    user: null,
    options: null,
    isLoggingOut: null,
};

// eslint-disable-next-line no-undef
export const TicketContext = createContext({state: initialState, dispatch: null});

export const TicketContextProvider = props => {

    const [state, dispatch] = useReducer((state, action) => logReducer(functionReducer, state, action), initialState);
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
