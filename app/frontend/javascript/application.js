"use strict";
// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.
exports.__esModule = true;
exports.TicketContextProvider = exports.TicketContext = void 0;
//require("@rails/ujs").start();
//require("turbolinks").start();
//require("@rails/activestorage").start();
//require("channels");
require("./channels");
// Uncomment to copy all static images under ../images to the output folder and reference
// them with the image_pack_tag helper in views (e.g <%= image_pack_tag 'rails.png' %>)
// or the `imagePath` JavaScript helper below.
//
// const images = require.context('../images', true)
// const imagePath = (name) => images(name, true)
//import 'stylesheets/application';
var react_1 = require("react");
var prop_types_1 = require("prop-types");
var react_dom_1 = require("react-dom");
var App_1 = require("../components/App");
var react_router_dom_1 = require("react-router-dom");
require("idempotent-babel-polyfill");
var react_cookie_1 = require("react-cookie");
var function_reducer_1 = require("function-reducer");
var initialPageInfo = {
    currentPage: 1,
    resourceCount: null,
    lastPage: null,
    perPage: 10,
    searchString: ""
};
var initialState = {
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
    isLoggingOut: null
};
// eslint-disable-next-line no-undef
exports.TicketContext = (0, react_1.createContext)({ state: initialState, dispatch: null });
var TicketContextProvider = function (props) {
    var _a = (0, react_1.useReducer)(function (state, action) { return (0, function_reducer_1.logReducer)(function_reducer_1["default"], state, action); }, initialState), state = _a[0], dispatch = _a[1];
    return (<exports.TicketContext.Provider value={{ state: state, dispatch: dispatch }}>
            {props.children}
        </exports.TicketContext.Provider>);
};
exports.TicketContextProvider = TicketContextProvider;
exports.TicketContextProvider.propTypes = {
    children: prop_types_1["default"].element.isRequired
};
document.addEventListener('DOMContentLoaded', function () {
    var container = document.querySelector('#root');
    (0, react_dom_1.render)(<exports.TicketContextProvider>
          <react_cookie_1.CookiesProvider>
            <react_router_dom_1.BrowserRouter>
              <App_1["default"] />
            </react_router_dom_1.BrowserRouter>
          </react_cookie_1.CookiesProvider>
        </exports.TicketContextProvider>, container);
});
import "@hotwired/turbo-rails"
import "./controllers"
