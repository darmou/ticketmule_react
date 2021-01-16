import React from "react";
import { useForm } from "react-hook-form";
import useTicketmule from "../hooks/useTicketMule";
import { TicketContext } from "../packs/application";
import { useMutation } from "react-query";
import SecondaryButton from "./ComponentLibrary/SecondaryButton";
import { createStandardSuccessMessage, createStandardErrorMessage } from "./ComponentLibrary/FlashMessages";
import ResourceStore from "../actions/resourceStore";
import { BoxStyled, LoginStyled, ValidationDiv, StyledInput } from "./Login";
import { Link } from "react-router-dom";

const Forgot = () => {
    const ticketMule = useTicketmule();
    const { register, handleSubmit, errors } = useForm();
    const { state, dispatch } = React.useContext(TicketContext);
    const { flashMsg } = state;
    let isLoading = false;

    const [forgot] = useMutation(
        ticketMule.forgot.bind(this), {
            onSuccess: async () => {
                dispatch({
                    action_fn: ResourceStore.setFlashMsg,
                    flashMsg: createStandardSuccessMessage(`Forgot password request successful! Please check your email!`)});
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
        await forgot(data);
    };


    return (<LoginStyled>
        <h1>Forgot Password</h1>

        <BoxStyled>
            {flashMsg}
            <form acceptCharset="UTF-8" onSubmit={handleSubmit(onSubmit.bind(this))}
                  className="new_user_session" id="new_user_session">
                <div style={{margin: 0, padding: 0, display: 'inline'}}>
                </div>
                <dl>
                    <dt>
                        <label htmlFor="user_session_email">Email:</label>
                    </dt>
                    <dd>
                        <StyledInput
                            id="user_session_email"
                            ref={register({required:true})}
                            name="email" size="23"
                            type="text"/>
                        {errors.username && <ValidationDiv>Username is required</ValidationDiv>}
                    </dd>
                    <dd>
                        <SecondaryButton disabled={isLoading} name="commit" type="submit"
                        >Email Password Reset</SecondaryButton>&nbsp;&nbsp;
                        <Link to="/">
                            Sign In
                        </Link>
                    </dd>
                </dl>
            </form>
        </BoxStyled>
    </LoginStyled>);

};

export default Forgot;