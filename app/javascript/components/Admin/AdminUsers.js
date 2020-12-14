import React, {useContext} from "react";
import { useForm } from "react-hook-form";
import { queryCache, useMutation } from "react-query";
import { PropTypes } from "prop-types";
import styled from "styled-components";
import { ErrorNotificationStyled, SuccessNotificationStyled } from "../ComponentLibrary/FlashMessages";
import EnableIcon from "../../images/accept.png";
import DisableIcon from "../../images/disable.png";
import useTicketmule from "../../hooks/useTicketMule";
import { TicketContext } from "../../packs/application";
import TicketStore from "../../actions/ticketStore";
import SecondaryButton from "../ComponentLibrary/SecondaryButton";
import { MIN_PASSWORD_LENGTH, timeZones } from "../Users/UserForm";
import { Error } from "../Resources/FormResouces";
import { useNavigate } from "react-router-dom";
import {Row} from "../ComponentLibrary/TableStyles";

const Label = styled.div`
    display: block;
    font-weight: bold;
`;

const StyledSecondaryButton = styled(SecondaryButton)`
    margin-left: 0;
`;

const StyledForm = styled.form`
    input, select {
        padding: 4px;
        background: #fff;
        border: 1px solid #ccc;
        font: 12px Verdana,sans-serif;
        border-radius: 3px;
        -moz-border-radius: 3px;
        -webkit-border-radius: 3px;
    }
`;

const FormRow = styled.div`
       margin-bottom: 10px;
`;

// eslint-disable-next-line react/display-name
const AdminUsers = React.memo(({setFlashMsg}) => {
    const { register, handleSubmit, reset, errors, getValues, clearErrors } = useForm();
    const ticketMule = useTicketmule();
    const { state, dispatch } = useContext(TicketContext);
    const selectedValue = React.useRef();
    const navigate = useNavigate();
    const [addTheUser] = useMutation(
        ticketMule.addUser.bind(this, state),

        {
            onSuccess: async (user) => {
                setFlashMsg(<SuccessNotificationStyled><img src={`${EnableIcon}`} /> {user.username} was successfully created! </SuccessNotificationStyled>);
                reset();
                await queryCache.invalidateQueries("users");
                dispatch({action_fn: TicketStore.addUser, aUser: user});
                navigate('/admin/');
            },
            onError: async (result) => {
                debugger;
                setFlashMsg(<ErrorNotificationStyled><img src={`${DisableIcon}`} /> {result.response.data.message} </ErrorNotificationStyled>);
            }
        }
    );

    const onSubmit = async (aUser) =>  {
        delete aUser["confirm_email"];
        delete aUser["password_confirmation"];
        await addTheUser(aUser);
    };

    return(
        <StyledForm onSubmit={handleSubmit(onSubmit.bind(this))}>
        <FormRow>
            <Label htmlFor="user_username">Username</Label>
            <input className="textfield" ref={register({required: true})} id="user_username" name="username" size="30" type="text"/>
            {(errors.username) && <Error>Username is required</Error>}
        </FormRow>
        <FormRow>
            <Label htmlFor="user_first_name">First name</Label>
            <input className="textfield" id="user_first_name" ref={register({required: true})} name="first_name" size="30" type="text"/>
            {(errors.first_name) && <Error>First name is required</Error>}
        </FormRow>
        <FormRow>
            <Label htmlFor="user_last_name">Last name</Label>
            <input className="textfield" id="user_last_name" ref={register({required: true})} name="last_name" size="30" type="text"/>
            {(errors.last_name) && <Error>Last name is required</Error>}
        </FormRow>
        <FormRow>
            <Label htmlFor="user_time_zone">Time zone</Label>
            <select name="time_zone"
                    defaultValue={(selectedValue.current) ? selectedValue.current : "Central Time (US & Canada)"}
                    ref={register({required: true})}
                    onChange={(evt) => {
                        selectedValue.current = evt.target.value;
                    }}>
                <option  value=""/>
                { timeZones.map(timeZone => {
                    return (<option  disabled={timeZone.value.length === 0} key={`${timeZone.value}`} value={timeZone.value}>{timeZone.display}</option>);
                })
                }
            </select>
            { (errors.time_zone) && <Error>TimeZone is required</Error> }
        </FormRow>
        <FormRow>
            <Label htmlFor="user_email">Email</Label>
            <input className="textfield" id="user_email"
                   onChange={() => {clearErrors("email"); clearErrors("confirm_email");}}
                   ref={register({
                required: true,
                pattern: /^\S+@\S+$/i,
                validate: () => getValues("email") === getValues("confirm_email")
                })} name="email" size="30" type="text"/>
            { (errors.email && errors.email.type === "required") && <Error>Email is required</Error> }
            { (errors.email && errors.email.type === "pattern") && <Error>Email is not valid</Error> }
            { (errors.email && (errors.email.type !== "required" && errors.email.type !== "pattern")) &&
                <Error>Email and Confirm Email must be the same</Error> }
        </FormRow>
        <FormRow>

            <Label htmlFor="user_email_confirmation">Confirm Email</Label>
            <input className="textfield" id="user_email_confirmation"
                   onChange={() => {clearErrors("email"); clearErrors("confirm_email");}}
                   ref={register({
                required: true,
                pattern: /^\S+@\S+$/i,
                validate: () => getValues("email") === getValues("confirm_email")
                })} name="confirm_email" size="30"
                   type="text"/>

            { (errors.confirm_email && errors.confirm_email.type === "required") && <Error>Confirm Email is required</Error> }
            { (errors.confirm_email && errors.confirm_email.type === "pattern") && <Error>Confirm Email is not valid</Error> }
            { (errors.confirm_email && (errors.confirm_email.type !== "required" && errors.confirm_email.type !== "pattern")) &&
                <Error>Email and Confirm Email must be the same</Error> }
        </FormRow>
        <FormRow>
            <Label htmlFor="user_password">Password</Label>
            <input className="textfield" id="user_password"
                   onChange={() => {clearErrors("password"); clearErrors("password_confirmation");}}
                   ref={register({
                       required: true,
                       minLength: MIN_PASSWORD_LENGTH,
                       validate: () => getValues("password") === getValues("password_confirmation")
                   })}
                   name="password" size="30" type="password"/>
            { (errors.password && errors.password.type === "required") && <Error>Password is required</Error> }
            { (errors.password && errors.password.type === "minLength") && <Error>Password should be minimum of {MIN_PASSWORD_LENGTH} characters</Error> }
            { (errors.password && errors.password.type === "validate") && <Error>Password and Confirm Password must be the same</Error> }
        </FormRow>
        <FormRow>
            <Label htmlFor="user_password_confirmation">Confirm Password</Label>
            <input className="textfield" id="user_password_confirmation"
                   onChange={() => {clearErrors("password"); clearErrors("password_confirmation");}}
                   ref={register({
                required: true,
                minLength: MIN_PASSWORD_LENGTH,
                validate: () => getValues("password") === getValues("password_confirmation")
                    })}
                   name="password_confirmation"
                   size="30" type="password"/>
            { (errors.password_confirmation && errors.password_confirmation.type === "required") && <Error>Confirm Password is required</Error> }
            { (errors.password_confirmation && errors.password_confirmation.type === "minLength") && <Error>Confirm Password should be minimum of {MIN_PASSWORD_LENGTH} characters</Error> }
            { (errors.password_confirmation && errors.password_confirmation.type === "validate") && <Error>Password and Confirm Password must be the same</Error> }
        </FormRow>
        <FormRow>
            <StyledSecondaryButton className="button" id="user_submit" name="commit" type="submit">Add User</StyledSecondaryButton>
        </FormRow>
        </StyledForm>
    );
});

AdminUsers.propTypes = {
    setFlashMsg: PropTypes.func
};

export default AdminUsers;