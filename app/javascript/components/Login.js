import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { login } from '../actions';
import { successFlash } from "../utils/display_utils";
import { TicketContext } from "../packs/application";

const formTypeEnum = {USERNAME: 1, PASSWORD: 2};
Object.freeze(formTypeEnum);

const Login = () =>  {

    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    const ticketContext = React.useContext(TicketContext);

    const onChange = (type, event) => {
        const { target } = event;
        if (type == formTypeEnum.USERNAME) {
            setUsername(target.value);

        } else {
            setPassword(target.value);
        }
    };

    const handleSubmit = async (event) => {
        const { dispatch } = ticketContext;
        event.preventDefault();
        await login(username, password, dispatch);
    };

    const { state } = ticketContext;
    let flash_msg = null;
    if (state.isLoggingOut === false) {
        flash_msg = <SuccessNotificationStyled> Logged Out Successfully </SuccessNotificationStyled>;
    }

    return (<LoginStyled>
        <h1>Sign in</h1>

        <BoxStyled>
            <FlashStyled>
                {flash_msg}
            </FlashStyled>
            <form acceptCharset="UTF-8" onSubmit={handleSubmit}
                  className="new_user_session" id="new_user_session">
                <div style={{margin: 0, padding: 0, display: 'inline'}}>
                    <input name="utf8" type="hidden" value="✓"/>
                    <input name="authenticity_token" type="hidden"
                           value="PPV4FAKIY2sHEPq1ePKoEzs5JFzP08t6geRxZDgnQI0="/>
                </div>
                <dl>
                    <dt>
                        <label htmlFor="user_session_username">Username:</label>
                    </dt>
                    <dd>
                        <StyledInput
                               id="user_session_username"
                               name="user_session[username]" size="20"

                               onChange={onChange.bind(this, formTypeEnum.USERNAME)}
                               type="text" autoComplete="off"/>
                    </dd>
                    <dt>
                        <label htmlFor="user_session_password">Password:</label>
                    </dt>
                    <dd>
                        <StyledInputPassword
                               id="user_session_password" name="user_session[password]"
                               size="20"
                               onChange={onChange.bind(this, formTypeEnum.PASSWORD)}
                               type="password" autoComplete="off"/>
                    </dd>
                    <dd>
                        <input name="user_session[remember_me]" type="hidden" value="0"/>
                        <input id="user_session_remember_me" name="user_session[remember_me]"
                               type="checkbox" value="1"/>
                        <label htmlFor="user_session_remember_me">Remember me</label>
                    </dd>
                    <dd>
                        <ButtonStyled name="commit" type="submit"
                               value="Sign in"/>&nbsp;&nbsp;
                        <Link to="/password_resets/new">
                            Forgot your password?
                        </Link>
                    </dd>
                </dl>
            </form>
        </BoxStyled>
    </LoginStyled>);

};


const SuccessNotificationStyled = styled.div`
  width: 100%;
  text-align: left;
  padding: 5px 10px 5px;

  background-color: #efe;
  color: #585;

  animation:${successFlash} 0.5s 1;
  animation-fill-mode: forwards;

  animation-delay:2s;
  -webkit-animation-delay:1s; /* Safari and Chrome */
  -webkit-animation-fill-mode: forwards;
`;

const ButtonStyled = styled.input`
    margin: 3px 0;
    padding: 2px 12px 2px;
    width: auto;
    color: #839F45;
    font-size: 12px;
    font-family: verdana,sans-serif;
    font-weight: bold;
    cursor: pointer;
    -moz-border-radius: 14px;
    -webkit-border-radius: 14px;
    -moz-box-shadow: 0 1px 3px rgba(0,0,0,0.25);
    -webkit-box-shadow: 0 1px 3px rgba(0,0,0,0.25);
    background: #fff;
    border-color: rgba(0,0,0,0.25) rgba(0,0,0,0.25) rgba(0,0,0,0.35);
    border-style: solid;
    border-width: 1px;
    text-decoration: none;
    text-shadow: 0 1px 1px rgba(255,255,255,0.65);
    outline: none;
    overflow: visible;
    display: inline;
    line-height: 14px;
    
    &:hover {
      background-color: #f4f4f4;
      color: #666;
    }
`;

const LoginStyled = styled.div`
margin: 20px auto;
  width: 375px;

  h1 {
    color: #90af4c;
    padding: 15px 0 0 0;
    width: auto;
    text-align: center;
    font-family: "Trebuchet MS", Verdana,sans-serif;
    text-shadow: 0 1px 0 #fff;
  }
`;


const textField = `
        padding: 4px;
        background: #fff;
        border: 1px solid #ccc;
        font: 12px Verdana,sans-serif;
        -moz-border-radius: 3px;
        -webkit-border-radius: 3px;
`;

const loginInputs = `
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAASCAYAAABSO15qAAAAAXNSR0IArs4c6QAAAXFJREFUOBGVVDGKwkAUfZHFaBBS2riQSrC18QJpAvbeYAVbD6DxFm4TELyA1R7BKmUgjRa7pAwELKKF2XljEuMSN/HDZOb//96b+X+GKLZtW0mSrMV4Rw1TFOVbwD6Wy+UX4Y1XyCSkG31yTaNArZ1v8Nu3yGkUE1VrTdPQ7\\/cfYC8JGIYB0zTLBVqtVp5QVRWiWblfzOXBdPHGeTweYzgcYrvdIgxDzGYzBEEAx3Eecn/J9F8qoUxAWSwWCRM8ZhzHEsMSzudzGT6PiRJ/hDPNT5CRiagiEyOusiemtewBA//ZZDLBYDDIIavVCtfrVYrUEmi324iiCPv9XoqQnFkjfduZXzpToNlsykdUJBNMgWmViO/78DwPuq7DsizwQWV2fy1ZJJ2z26Hb6XRwOp0wGo2kwG63g+u6ElmrB/P5XApQ6HK54HA4pNsATwV4z+lVYbPZoNvtys6zHDaURsxTAZFnb/ij6R2PR3AUjWRifgHmko6KAvVfRAAAAABJRU5ErkJggg==);
        background-repeat: no-repeat;
        background-attachment: scroll;
        background-size: 16px 18px;
        background-position: 98% 50%;
`;

const password = `
    cursor: pointer;
`;

const StyledInput = styled.input`
    ${textField}
    ${loginInputs}
`;

const StyledInputPassword = styled.input`
    ${textField}
    ${loginInputs}
    ${password}
`;

const FlashStyled = styled.div`
    width: calc(100% - 20px);
`;

const BoxStyled = styled.div`
    padding: 10px;
    margin: 30px 5px 5px 0;
    background: #fff;
    border: 1px solid #bbb;
    -moz-border-radius: 8px;
    -webkit-border-radius: 8px;
    -moz-box-shadow: 2px 2px 3px #ddd;
    -webkit-box-shadow: 2px 2px 3px #ddd;

    form {
      margin: 0 0 5px 0;

      a:link, a:visited {
        color: #4d88cf;
      }

      dl {
        margin: 15px 10px;

        dt {
          float: left;
          width: 85px;
          font-size: 12px;
          line-height: 2.1em;
          text-align: right;
        }

        dd {
          margin: 0 0 5px 95px;
          line-height: 2em;
          color: #333;
        }
      }

      .button {
        margin: 3px 0;
        padding: 2px 12px 2px;
        width: auto;
        color: #839F45;
        font-size: 12px;
        font-family: verdana,sans-serif;
        font-weight: bold;
        cursor: pointer;
        -moz-border-radius: 14px;
        -webkit-border-radius: 14px;
        -moz-box-shadow: 0 1px 3px rgba(0,0,0,0.25);
        -webkit-box-shadow: 0 1px 3px rgba(0,0,0,0.25);
        background: #fff;
        border-color: rgba(0,0,0,0.25) rgba(0,0,0,0.25) rgba(0,0,0,0.35);
        border-style: solid;
        border-width: 1px;
        text-decoration: none;
        text-shadow: 0 1px 1px rgba(255,255,255,0.65);
        outline: none;
        overflow: visible;
        display: inline;
        line-height: 14px;

        &:hover {
          background-color: #f4f4f4;
          color: #666;
        }
      }
    }
`;

export default Login;