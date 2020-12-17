import React from "react";
import { useForm } from "react-hook-form";
import useTicketmule from "../hooks/useTicketMule";
import { TicketContext } from "../packs/application";
import { useMutation } from "react-query";
import UserStore from "../actions/userStore";
import SecondaryButton from "./ComponentLibrary/SecondaryButton";
import { createStandardSuccessMessage, createStandardErrorMessage } from "./ComponentLibrary/FlashMessages";
import TicketStore from "../actions/ticketStore";
import { BoxStyled, LoginStyled, ValidationDiv, StyledInputPassword } from "./Login";
import { MIN_PASSWORD_LEN } from "./ComponentLibrary/FormComponentsStyled";
import { Link } from "react-router-dom";

const ResetPassword = () => {
    const ticketMule = useTicketmule();
    const { register, handleSubmit, errors, getValues } = useForm();
    const { state, dispatch } = React.useContext(TicketContext);
    const { flashMsg } = state;
    let isLoading = false;

    const [resetPassword] = useMutation(
        ticketMule.resetPassword.bind(this), {
            onSuccess: async (theUser) => {
                dispatch({
                    action_fn: TicketStore.setFlashMsg,
                    flashMsg: createStandardSuccessMessage(`Reset password request successful! Please login!`)});
                dispatch({action_fn: UserStore.setUser, user: theUser});
            },
            onError: () => {
                const msg = "Error occurred";
                dispatch({
                    action_fn: TicketStore.setFlashMsg,
                    flashMsg: createStandardErrorMessage(msg)});
            }

        },
    );

    const onSubmit = async (data) => {
        await resetPassword(data);
    };

    return (<LoginStyled>
        <h1>Reset Password</h1>

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
                            ref={register({required:true,
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
                            ref={register(
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
                        <Link to="/login">
                            Forgot your password?
                        </Link>
                    </dd>
                </dl>
            </form>
        </BoxStyled>
    </LoginStyled>);

};

export default ResetPassword;