import React from "react";
import { useForm } from "react-hook-form";
import useTicketmule from "../hooks/useTicketMule";
import { TicketContext } from "../application";
import { useMutation } from "react-query";
import UserStore from "../actions/userStore";
import SecondaryButton from "./ComponentLibrary/SecondaryButton";
import { createStandardErrorMessage, createStandardSuccessMessage } from "./ComponentLibrary/FlashMessages";
import ResourceStore from "../actions/resourceStore";
import { BoxStyled, LoginStyled, StyledInputPassword, ValidationDiv } from "./Login";
import { MIN_PASSWORD_LEN } from "./ComponentLibrary/FormComponentsStyled";
import { Link, useNavigate } from "react-router-dom";

const ResetPassword = () => {
    const ticketMule = useTicketmule();
    const { register, handleSubmit, formState: { errors }, clearErrors, getValues } = useForm();
    const { state, dispatch } = React.useContext(TicketContext);
    const { flashMsg } = state;
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const username = urlParams.get("username");
    const navigate = useNavigate();
    const token = urlParams.get("reset_token");
    let isLoading = false;

    const { mutate } = useMutation(
        ticketMule.reset_password.bind(this, token), {
            onSuccess: async (theUser) => {
                if (theUser === "not_found") {
                    dispatch({
                        action_fn: ResourceStore.setFlashMsg,
                        flashMsg: createStandardErrorMessage("User not found, invalid token")});
                } else {
                    dispatch({
                        action_fn: ResourceStore.setFlashMsg,
                        flashMsg: createStandardSuccessMessage(`Reset password request successful!`)});

                    dispatch({action_fn: UserStore.setUser, user: theUser});
                    navigate("/tickets");
                }

            },
            onError: () => {
                const msg = "Error occurred";
                dispatch({
                    action_fn: ResourceStore.setFlashMsg,
                    flashMsg: createStandardErrorMessage(msg)});
            }

        },
    );

    const onSubmit = async (data) => {
        await mutate(data.password);
    };

    return (<LoginStyled>
        <h1>Reset Password for {username}</h1>

        <BoxStyled>
            {flashMsg}
            <form acceptCharset="UTF-8" onSubmit={handleSubmit(onSubmit.bind(this))}
                  className="new_user_session" id="new_user_session">
                <div style={{margin: 0, padding: 0, display: 'inline'}}>
                </div>
                <dl>
                    <dt>
                        <label htmlFor="user_session_password">Password:</label>
                    </dt>
                    <dd>
                        <StyledInputPassword
                            id="user_session_password" name="password"
                            size="20"
                            onChange={() => clearErrors('password')}
                            {...register("password", {required:true,
                                validate: () => getValues("password") === getValues("confirm_password"),
                                minLength:MIN_PASSWORD_LEN})}
                            type="password"/>
                        {(errors.password && errors.password.type === 'required') && <ValidationDiv>Password is required</ValidationDiv>}
                        {(errors.password && errors.password.type === 'minLength' &&
                            <ValidationDiv>Password length must be at least {MIN_PASSWORD_LEN} characters</ValidationDiv>)}
                        {(errors.password && errors.password.type === 'validate') && <ValidationDiv>Password and Confirm Password must be the same</ValidationDiv>}
                    </dd>
                    <dt>
                        <label htmlFor="user_session_confirm_password">Confirm Password:</label>
                    </dt>
                    <dd>
                        <StyledInputPassword
                            id="user_session_confirm_password" name="confirm_password"
                            size="20"
                            onChange={() => clearErrors('confirm_password')}
                            {...register("confirm_password",
                                {required:true,
                                    validate: () => getValues("password") === getValues("confirm_password"),
                                    minLength:MIN_PASSWORD_LEN})}
                            type="password" />
                        {(errors.confirm_password && errors.confirm_password.type === 'required') && <ValidationDiv>Password is required</ValidationDiv>}
                        {(errors.confirm_password && errors.confirm_password.type === 'minLength' &&
                            <ValidationDiv>Confirm Password length must be at least {MIN_PASSWORD_LEN} characters</ValidationDiv>)}
                        {(errors.confirm_password && errors.confirm_password.type === 'validate') && <ValidationDiv>Password and Confirm Password must be the same</ValidationDiv>}

                    </dd>
                    <dd>
                        <SecondaryButton disabled={isLoading} name="commit" type="submit"
                        >Reset Password</SecondaryButton>&nbsp;&nbsp;
                        <Link to="/">
                            Go to login page
                        </Link>
                    </dd>
                </dl>
            </form>
        </BoxStyled>
    </LoginStyled>);
};

export default ResetPassword;