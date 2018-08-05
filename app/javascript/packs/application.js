/* eslint no-console:0 */
// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.
//
// To reference this file, add <%= javascript_pack_tag 'application' %> to the appropriate
// layout file, like app/views/layouts/application.html.erb

import React from 'react';
import { render } from 'react-dom';
import App from '../components/App';
import { BrowserRouter } from 'react-router-dom';
import "babel-polyfill";
import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { CookiesProvider } from 'react-cookie';

const store = createStore(rootReducer, applyMiddleware(thunk));


document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('#root');
    render(
        <Provider store={store}>
          <CookiesProvider>
            <BrowserRouter>
              <App/>
            </BrowserRouter>
          </CookiesProvider>
        </Provider>, container
    );
});
