import React from 'react';
import {
  Switch,
  Route
} from "react-router-dom";
import Login from "./Login";
import Footer from "./Footer";
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { checkLogin } from '../actions';
import { bindActionCreators } from 'redux';

import styles from "styles/Dashboard";

class Dashboard extends React.Component {

  state = {
    tickets: []
  };

  render() {
    return <div className={styles.Dashboard}>
      <h1>Test</h1>
    </div>;

  }
}

export default Dashboard;