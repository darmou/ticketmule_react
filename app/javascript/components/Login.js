import React from 'react';
import PropTypes from 'prop-types';
import styles from "styles/Login";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { login } from '../actions';
import { bindActionCreators } from 'redux';

const formTypeEnum = { USERNAME: 1, PASSWORD: 2 };
Object.freeze(formTypeEnum);

class  Login extends React.Component {

  state = {
    username: '',
    password: ''
  };

  onChange(type, event) {
    if (type == formTypeEnum.USERNAME) {
      this.setState({ username: event.target.value });
    } else {
      this.setState({ password: event.target.value });
    }
  }



  handleSubmit(event)  {
    this.props.login(this.state.username, this.state.password);
    event.preventDefault();
  }



  render() {


    return(
    <div className={styles.login}>
      <h1>Sign in</h1>

      <div className={styles.box}>

        <form acceptCharset="UTF-8" onSubmit={this.handleSubmit.bind(this)} className="new_user_session" id="new_user_session">
          <div style={{margin:0, padding:0,display:'inline'}}>
            <input name="utf8" type="hidden" value="✓"/>
            <input name="authenticity_token" type="hidden" value="PPV4FAKIY2sHEPq1ePKoEzs5JFzP08t6geRxZDgnQI0="/>
          </div>
          <dl>
            <dt>
              <label htmlFor="user_session_username">Username:</label>
            </dt>
            <dd>
              <input className={[styles.textfield, styles.loginInputs].join(' ')} id="user_session_username"
                     name="user_session[username]" size="20"

                     onChange={this.onChange.bind(this, formTypeEnum.USERNAME)}
                     type="text" autoComplete="off"/>
            </dd>
            <dt>
              <label htmlFor="user_session_password">Password:</label>
            </dt>
            <dd>
              <input className={[styles.textfield, styles.loginInputs, styles.password].join(' ')}
                     id="user_session_password" name="user_session[password]"
                     size="20"
                     onChange={this.onChange.bind(this, formTypeEnum.PASSWORD)}
                     type="password" autoComplete="off"/>
            </dd>
            <dd>
              <input name="user_session[remember_me]" type="hidden" value="0"/>
              <input id="user_session_remember_me" name="user_session[remember_me]" type="checkbox" value="1"/>
              <label htmlFor="user_session_remember_me">Remember me</label>
            </dd>
            <dd>
              <input className={styles.button} name="commit" type="submit" value="Sign in"/>&nbsp;&nbsp;
              <Link to="/password_resets/new">
                Forgot your password?
              </Link>
            </dd>
          </dl>
        </form>
      </div>
    </div>);
  }
  }

const mapDispatchToProps = (dispatch) => {

  return bindActionCreators({
    login: login
  }, dispatch);
};

const mapStateToProps = (state) => ({
  user: state.user
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);