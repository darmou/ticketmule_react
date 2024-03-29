import React from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { Link } from "react-router-dom";
import useTicketmule from "../hooks/useTicketMule";
import { TicketContext } from "../application";
import { useMutation } from "react-query";
import moment from "moment";
import UserStore from "../actions/userStore";
import SecondaryButton from "./ComponentLibrary/SecondaryButton";
import { createStandardErrorMessage, createStandardSuccessMessage, TIMEOUT } from "./ComponentLibrary/FlashMessages";
import ResourceStore from "../actions/resourceStore";
import { stringToBoolean } from "../utils/displayUtils";
import { User } from "../types/types";
import { AxiosResponse } from "axios";

const formTypeEnum = { USERNAME: 1, PASSWORD: 2 };
Object.freeze(formTypeEnum);

interface Error {
    response: AxiosResponse
}

const Login = () =>  {
    const ticketMule = useTicketmule();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { state, dispatch } = React.useContext(TicketContext);
    const { flashMsg, isLoggingOut } = state;
    let isLoading = false;

    const {mutate: login} = useMutation(
        ticketMule.login.bind(this), {
            onSuccess: async (theUser: User) => {
                dispatch({
                    action_fn: ResourceStore.setFlashMsg,
                    flashMsg: createStandardSuccessMessage(`Welcome ${theUser.username}! You last signed in on ${moment(theUser.last_sign_in_at).format("DD MMM YYYY hh:mm A")} from ${theUser.last_sign_in_ip}`)});
                dispatch({action_fn: UserStore.setUser, user: theUser});
            },
            onError: (error: Error) => {
                const msg = (error.response.status === 401 ) ? "Incorrect login details" : "Error occurred";
                dispatch({
                    action_fn: ResourceStore.setFlashMsg,
                    flashMsg: createStandardErrorMessage(msg)});
            }

        },
    );

    React.useEffect(() => {

        if (isLoggingOut && flashMsg == null) {
            dispatch({
                action_fn: ResourceStore.setFlashMsg,
                flashMsg: createStandardSuccessMessage("Logged Out Successfully")});
            dispatch({action_fn: UserStore.resetIsLoggingOut } );
        }

        if (flashMsg) {
            setTimeout(() => {
                dispatch({
                    action_fn: ResourceStore.setFlashMsg,
                    flashMsg: null});
            }, TIMEOUT);
        }
    }, [isLoggingOut, flashMsg, dispatch, TIMEOUT]);


    const onSubmit = async (data) => {
        isLoading = true;
        if (stringToBoolean(`${data["remember_me"]}`) === true) {
            localStorage.setItem("username", data.username);
        }
        await login(data);
        isLoading = false;
    };


    return (<LoginStyled>
        <h1>Sign in</h1>

        <BoxStyled>
            {flashMsg}
            <form acceptCharset="UTF-8" onSubmit={handleSubmit(onSubmit.bind(this))}
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
                               {...register("username", {required:true})}
                               defaultValue={localStorage.getItem("username")}
                               name="username" size="20"
                               type="text" autoComplete={(localStorage.getItem("username")) ? "on": "off"}/>
                        {errors.username && <ValidationDiv>Username is required</ValidationDiv>}
                    </dd>
                    <dt>
                        <label htmlFor="user_session_password">Password:</label>
                    </dt>
                    <dd>
                        <StyledInputPassword
                               id="user_session_password" name="password"
                               size="20"
                               {...register("password", {required:true})}
                               type="password" autoComplete={(localStorage.getItem("username")) ? "on": "off"}/>
                        {errors.password && <ValidationDiv>Password is required</ValidationDiv>}
                    </dd>
                    <dd>
                        <input name="user_session[remember_me]" type="hidden" value="0"/>
                        <input id="user_session_remember_me" name="remember_me"
                               {...register}
                               type="checkbox" value="true"/>
                        <label htmlFor="user_session_remember_me">Remember me</label>
                    </dd>
                    <dd>
                        <SecondaryButton disabled={isLoading} name="commit" type="submit"
                        >Sign In</SecondaryButton>&nbsp;&nbsp;
                        <Link to="/forgot">
                            Forgot your password?
                        </Link>
                    </dd>
                </dl>
            </form>
        </BoxStyled>
    </LoginStyled>);

};

export const ValidationDiv = styled.div`
    margin-top: 3px;
    margin-bottom: 3px;
    color: red;
    background-color: #F4CCC3;
`;



export const LoginStyled = styled.div`
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


export const textField = `
        padding: 4px;
        background: #fff;
        border: 1px solid #ccc;
        font: 12px Verdana,sans-serif;
        -moz-border-radius: 3px;
        -webkit-border-radius: 3px;
`;

export const loginInputs = `
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAASCAYAAABSO15qAAAAAXNSR0IArs4c6QAAAXFJREFUOBGVVDGKwkAUfZHFaBBS2riQSrC18QJpAvbeYAVbD6DxFm4TELyA1R7BKmUgjRa7pAwELKKF2XljEuMSN/HDZOb//96b+X+GKLZtW0mSrMV4Rw1TFOVbwD6Wy+UX4Y1XyCSkG31yTaNArZ1v8Nu3yGkUE1VrTdPQ7\\/cfYC8JGIYB0zTLBVqtVp5QVRWiWblfzOXBdPHGeTweYzgcYrvdIgxDzGYzBEEAx3Eecn/J9F8qoUxAWSwWCRM8ZhzHEsMSzudzGT6PiRJ/hDPNT5CRiagiEyOusiemtewBA//ZZDLBYDDIIavVCtfrVYrUEmi324iiCPv9XoqQnFkjfduZXzpToNlsykdUJBNMgWmViO/78DwPuq7DsizwQWV2fy1ZJJ2z26Hb6XRwOp0wGo2kwG63g+u6ElmrB/P5XApQ6HK54HA4pNsATwV4z+lVYbPZoNvtys6zHDaURsxTAZFnb/ij6R2PR3AUjWRifgHmko6KAvVfRAAAAABJRU5ErkJggg==);
        background-repeat: no-repeat;
        background-attachment: scroll;
        background-size: 16px 18px;
        background-position: 98% 50%;
`;

export const password = `
    cursor: pointer;
`;

export const StyledInput = styled.input`
    ${textField}
    ${loginInputs}
`;

export const StyledInputPassword = styled.input`
    ${textField}
    ${loginInputs}
    ${password}
`;


export const BoxStyled = styled.div`
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