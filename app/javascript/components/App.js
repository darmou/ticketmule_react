import React from 'react';
import {
  Switch,
  Route
} from "react-router-dom";
import styles from "styles/App";
import Login from "./Login";
import Footer from "./Footer";
import Header from "./Header";
import Dashboard from "./Dashboard";
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { receiveLogin } from '../actions';
import { bindActionCreators } from 'redux';
import { withCookies, Cookies } from 'react-cookie';
import Menu from "./Menu";



class App extends React.Component {

    state = {
        tickets: []
    };


  componentDidMount() {
     if(!this.props.user || !this.props.user.token) {
       if(sessionStorage.getItem("token")) {
         const user = {
           email:sessionStorage.getItem("email"),
           authentication_token: sessionStorage.getItem("token"),
         };
         this.props.receiveLogin(user);
       }
     }
  }

    render() {

        const dash = (this.props.user && this.props.user.token) ? Dashboard : Login;

        return (
            <div className={styles.App}>
              <Header user={this.props.user}/>
              <div className={styles.content}>
                <Switch>
                  <Route exact path='/' component={dash}/>
                </Switch>
              <Footer/>
              </div>
            </div>
        );
    }
}


const mapDispatchToProps = (dispatch) => {

  return bindActionCreators({
    receiveLogin: receiveLogin
  }, dispatch);
};

const mapStateToProps = (state) => ({
  user: state.user
});

export default withCookies(withRouter(connect(mapStateToProps, mapDispatchToProps)(App)))