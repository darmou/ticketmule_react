import React from 'react';
import {
  Switch,
  Route
} from "react-router-dom";
import styles from "styles/App";
import Login from "./Login";
import Footer from "./Footer";

export default class App extends React.Component {

    state = {
        tickets: []
    };

    render() {
        return (
            <div className={styles.App}>
              <header className={styles.appHeader}>
                <h1 className={styles.appTitle}>TicketMule</h1>
              </header>
              <div className={styles.content}>
                <Login/>
              <Footer/>
              </div>
            </div>
        );
    }
}