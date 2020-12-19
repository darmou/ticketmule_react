import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import SecondaryButton from "../ComponentLibrary/SecondaryButton";
import { useForm } from "react-hook-form";
import {
    StyledForm,
    StyledLabel,
    Label,
    StyledRow,
    Row,
    MIN_PASSWORD_LEN,
    Error } from "../ComponentLibrary/FormComponentsStyled";
import { onSubmitForm } from "../../utils/displayUtils";
import { User, RESOURCE_TYPES } from "../../types/types";

type TimeZone = {
    value: string,
    display: string
}

export const timeZones: TimeZone[] = [
    { value: "Hawaii", display: "(GMT-10:00) Hawaii" },
    { value: "Alaska", display: "(GMT-09:00) Alaska" },
    { value: "Pacific Time (US & Canada)", display: "(GMT-08:00) Pacific Time (US & Canada)" },
    { value: "Arizona", display: "(GMT-07:00) Arizona" },
    { value: "Mountain Time (US & Canada)", display: "(GMT-07:00) Mountain Time (US & Canada)" },
    { value: "Central Time (US & Canada)", display: "(GMT-06:00) Central Time (US & Canada)" },
    { value: "Eastern Time (US & Canada)", display: "(GMT-05:00) Eastern Time (US & Canada)" },
    { value: "Indiana (East)", display: "(GMT-05:00) Indiana (East)" },
    { value: "", display: "-------------" },
    { value: "International Date Line West", display: "(GMT-11:00) International Date Line West" },
    { value: "Midway Island", display: "(GMT-11:00) Midway Island" },
    { value: "Samoa", display: "(GMT-11:00) Samoa" },
    { value: "Tijuana", display: "(GMT-08:00) Tijuana" },
    { value: "Chihuahua", display: "(GMT-07:00) Chihuahua" },
    { value: "Mazatlan", display: "(GMT-07:00) Mazatlan" },
    { value: "Central America", display: "(GMT-06:00) Central America" },
    { value: "Guadalajara", display: "(GMT-06:00) Guadalajara" },
    { value: "Mexico City", display: "(GMT-06:00) Mexico City" },
    { value: "Monterrey", display: "(GMT-06:00) Monterrey" },
    { value: "Saskatchewan", display: "(GMT-06:00) Saskatchewan" },
    { value: "Bogota", display: "(GMT-05:00) Bogota" },
    { value: "Lima", display: "(GMT-05:00) Lima" },
    { value: "Quito", display: "(GMT-05:00) Quito" },
    { value: "Caracas", display: "(GMT-04:30) Caracas" },
    { value: "Atlantic Time (Canada)", display: "(GMT-04:00) Atlantic Time (Canada)" },
    { value: "La Paz", display: "(GMT-04:00) La Paz" },
    { value: "Santiago", display: "(GMT-04:00) Santiago" },
    { value: "Newfoundland", display: "(GMT-03:30) Newfoundland" },
    { value: "Brasilia", display: "(GMT-03:00) Brasilia" },
    { value: "Buenos Aires", display: "(GMT-03:00) Buenos Aires" },
    { value: "Georgetown", display: "(GMT-03:00) Georgetown" },
    { value: "Greenland", display: "(GMT-03:00) Greenland" },
    { value: "Mid-Atlantic", display: "(GMT-02:00) Mid-Atlantic" },
    { value: "Azores", display: "(GMT-01:00) Azores" },
    { value: "Cape Verde Is.", display: "(GMT-01:00) Cape Verde Is." },
    { value: "Casablanca", display: "(GMT+00:00) Casablanca" },
    { value: "Dublin", display: "(GMT+00:00) Dublin" },
    { value: "Edinburgh", display: "(GMT+00:00) Edinburgh" },
    { value: "Lisbon", display: "(GMT+00:00) Lisbon" },
    { value: "London", display: "(GMT+00:00) London" },
    { value: "Monrovia", display: "(GMT+00:00) Monrovia" },
    { value: "UTC", display: "(GMT+00:00) UTC" },
    { value: "Amsterdam", display: "(GMT+01:00) Amsterdam" },
    { value: "Belgrade", display: "(GMT+01:00) Belgrade" },
    { value: "Berlin", display: "(GMT+01:00) Berlin" },
    { value: "Bern", display: "(GMT+01:00) Bern" },
    { value: "Bratislava", display: "(GMT+01:00) Bratislava" },
    { value: "Brussels", display: "(GMT+01:00) Brussels" },
    { value: "Budapest", display: "(GMT+01:00) Budapest" },
    { value: "Copenhagen", display: "(GMT+01:00) Copenhagen" },
    { value: "Ljubljana", display: "(GMT+01:00) Ljubljana" },
    { value: "Madrid", display: "(GMT+01:00) Madrid" },
    { value: "Paris", display: "(GMT+01:00) Paris" },
    { value: "Prague", display: "(GMT+01:00) Prague" },
    { value: "Rome", display: "(GMT+01:00) Rome" },
    { value: "Sarajevo", display: "(GMT+01:00) Sarajevo" },
    { value: "Skopje", display: "(GMT+01:00) Skopje" },
    { value: "Stockholm", display: "(GMT+01:00) Stockholm" },
    { value: "Vienna", display: "(GMT+01:00) Vienna" },
    { value: "Warsaw", display: "(GMT+01:00) Warsaw" },
    { value: "West Central Africa", display: "(GMT+01:00) West Central Africa" },
    { value: "Zagreb", display: "(GMT+01:00) Zagreb" },
    { value: "Athens", display: "(GMT+02:00) Athens" },
    { value: "Bucharest", display: "(GMT+02:00) Bucharest" },
    { value: "Cairo", display: "(GMT+02:00) Cairo" },
    { value: "Harare", display: "(GMT+02:00) Harare" },
    { value: "Helsinki", display: "(GMT+02:00) Helsinki" },
    { value: "Istanbul", display: "(GMT+02:00) Istanbul" },
    { value: "Jerusalem", display: "(GMT+02:00) Jerusalem" },
    { value: "Kyev", display: "(GMT+02:00) Kyev" },
    { value: "Minsk", display: "(GMT+02:00) Minsk" },
    { value: "Pretoria", display: "(GMT+02:00) Pretoria" },
    { value: "Riga", display: "(GMT+02:00) Riga" },
    { value: "Sofia", display: "(GMT+02:00) Sofia" },
    { value: "Tallinn", display: "(GMT+02:00) Tallinn" },
    { value: "Vilnius", display: "(GMT+02:00) Vilnius" },
    { value: "Baghdad", display: "(GMT+03:00) Baghdad" },
    { value: "Kuwait", display: "(GMT+03:00) Kuwait" },
    { value: "Moscow", display: "(GMT+03:00) Moscow" },
    { value: "Nairobi", display: "(GMT+03:00) Nairobi" },
    { value: "Riyadh", display: "(GMT+03:00) Riyadh" },
    { value: "St. Petersburg", display: "(GMT+03:00) St. Petersburg" },
    { value: "Volgograd", display: "(GMT+03:00) Volgograd" },
    { value: "Tehran", display: "(GMT+03:30) Tehran" },
    { value: "Abu Dhabi", display: "(GMT+04:00) Abu Dhabi" },
    { value: "Baku", display: "(GMT+04:00) Baku" },
    { value: "Muscat", display: "(GMT+04:00) Muscat" },
    { value: "Tbilisi", display: "(GMT+04:00) Tbilisi" },
    { value: "Yerevan", display: "(GMT+04:00) Yerevan" },
    { value: "Kabul", display: "(GMT+04:30) Kabul" },
    { value: "Ekaterinburg", display: "(GMT+05:00) Ekaterinburg" },
    { value: "Islamabad", display: "(GMT+05:00) Islamabad" },
    { value: "Karachi", display: "(GMT+05:00) Karachi" },
    { value: "Tashkent", display: "(GMT+05:00) Tashkent" },
    { value: "Chennai", display: "(GMT+05:30) Chennai" },
    { value: "Kolkata", display: "(GMT+05:30) Kolkata" },
    { value: "Mumbai", display: "(GMT+05:30) Mumbai" },
    { value: "New Delhi", display: "(GMT+05:30) New Delhi" },
    { value: "Sri Jayawardenepura", display: "(GMT+05:30) Sri Jayawardenepura" },
    { value: "Kathmandu", display: "(GMT+05:45) Kathmandu" },
    { value: "Almaty", display: "(GMT+06:00) Almaty" },
    { value: "Astana", display: "(GMT+06:00) Astana" },
    { value: "Dhaka", display: "(GMT+06:00) Dhaka" },
    { value: "Novosibirsk", display: "(GMT+06:00) Novosibirsk" },
    { value: "Rangoon", display: "(GMT+06:30) Rangoon" },
    { value: "Bangkok", display: "(GMT+07:00) Bangkok" },
    { value: "Hanoi", display: "(GMT+07:00) Hanoi" },
    { value: "Jakarta", display: "(GMT+07:00) Jakarta" },
    { value: "Krasnoyarsk", display: "(GMT+07:00) Krasnoyarsk" },
    { value: "Beijing", display: "(GMT+08:00) Beijing" },
    { value: "Chongqing", display: "(GMT+08:00) Chongqing" },
    { value: "Hong Kong", display: "(GMT+08:00) Hong Kong" },
    { value: "Irkutsk", display: "(GMT+08:00) Irkutsk" },
    { value: "Kuala Lumpur", display: "(GMT+08:00) Kuala Lumpur" },
    { value: "Perth", display: "(GMT+08:00) Perth" },
    { value: "Singapore", display: "(GMT+08:00) Singapore" },
    { value: "Taipei", display: "(GMT+08:00) Taipei" },
    { value: "Ulaan Bataar", display: "(GMT+08:00) Ulaan Bataar" },
    { value: "Urumqi", display: "(GMT+08:00) Urumqi" },
    { value: "Osaka", display: "(GMT+09:00) Osaka" },
    { value: "Sapporo", display: "(GMT+09:00) Sapporo" },
    { value: "Seoul", display: "(GMT+09:00) Seoul" },
    { value: "Tokyo", display: "(GMT+09:00) Tokyo" },
    { value: "Yakutsk", display: "(GMT+09:00) Yakutsk" },
    { value: "Adelaide", display: "(GMT+09:30) Adelaide" },
    { value: "Darwin", display: "(GMT+09:30) Darwin" },
    { value: "Brisbane", display: "(GMT+10:00) Brisbane" },
    { value: "Canberra", display: "(GMT+10:00) Canberra" },
    { value: "Guam", display: "(GMT+10:00) Guam" },
    { value: "Hobart", display: "(GMT+10:00) Hobart" },
    { value: "Melbourne", display: "(GMT+10:00) Melbourne" },
    { value: "Port Moresby", display: "(GMT+10:00) Port Moresby" },
    { value: "Sydney", display: "(GMT+10:00) Sydney" },
    { value: "Vladivostok", display: "(GMT+10:00) Vladivostok" },
    { value: "Magadan", display: "(GMT+11:00) Magadan" },
    { value: "New Caledonia", display: "(GMT+11:00) New Caledonia" },
    { value: "Solomon Is.", display: "(GMT+11:00) Solomon Is." },
    { value: "Auckland", display: "(GMT+12:00) Auckland" },
    { value: "Fiji", display: "(GMT+12:00) Fiji" },
    { value: "Kamchatka", display: "(GMT+12:00) Kamchatka" },
    { value: "Marshall Is.", display: "(GMT+12:00) Marshall Is." },
    { value: "Wellington", display: "(GMT+12:00) Wellington" },
    { value: "Nuku'alofa", display: "(GMT+13:00) Nuku'alofa" }
];

const StyledFormAdmin = styled.form`
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

const FormInput = styled.input`
`;

const UserStyledLabel = styled(StyledLabel)`;
    width: 123px !important;
`;

interface Props {
    isAdminForm?: boolean,
    addOrUpdate: any,
    aUser: User,
    formAction?: (json: string) => void,
    slug?: string
}

const UserForm = ({addOrUpdate, formAction, slug, aUser, isAdminForm = false}: Props) => {
    const { register, handleSubmit, errors, getValues, clearErrors } = useForm();

    const onSubmit = async (data) => {
        delete data["confirm_password"];
        delete data["confirm_email"];
        if (!isAdminForm && data["password"].length === 0) {
            delete data["password"];
        }
        await onSubmitForm(data, RESOURCE_TYPES.USER, formAction, addOrUpdate, aUser);
    };
    const Form = (isAdminForm) ? StyledFormAdmin : StyledForm;
    const FormRow = (isAdminForm) ? StyledRow : Row;
    const FormLabel = (isAdminForm) ? Label : UserStyledLabel;

    return(<Form acceptCharset="UTF-8" onSubmit={handleSubmit(onSubmit.bind(this))}>
        <FormRow>
            <FormLabel>Username:</FormLabel>
            <FormInput name="username" ref={register({required: true})}
                         size="30"
                         defaultValue={(aUser) ? aUser.username : ""} type="text"/>
            {(errors.username) && <>{(!isAdminForm) && <StyledLabel>&nbsp;</StyledLabel>}<Error>Username is required</Error></>}
        </FormRow>
        <FormRow>
            <FormLabel>First name:</FormLabel>
            <FormInput size="30" name="first_name" ref={register({required: true})}
                         defaultValue={(aUser) ? aUser.first_name : ""} type="text"/>
            {(errors.first_name) && <>{(!isAdminForm) && <StyledLabel>&nbsp;</StyledLabel>}<Error>First name is required</Error></>}
        </FormRow>
        <FormRow>
            <FormLabel>Last name:</FormLabel>
            <FormInput size="30" name="last_name" ref={register({required: true})}
                         defaultValue={(aUser) ? aUser.last_name : ""} type="text"/>
            {(errors.last_name) && <>{(!isAdminForm) && <StyledLabel>&nbsp;</StyledLabel>}<Error>Last name is required</Error></>}
        </FormRow>
        <FormRow>
            <FormLabel>Time zone:</FormLabel>
            <select  name="time_zone" ref={register({required: true})}
                     defaultValue={(isAdminForm) ? "Central Time (US & Canada)" : (aUser && aUser.time_zone) ? aUser.time_zone : null}
            >
                <option  value=""/>
                { timeZones.map(timeZone => {
                    return (<option
                                     disabled={timeZone.value.length === 0}
                                     key={`${timeZone.value}`}
                                     value={timeZone.value}>{timeZone.display}</option>);
                })
                }
            </select>
            { (errors.time_zone) && <Row><StyledLabel>&nbsp;</StyledLabel><Error>TimeZone is required</Error></Row> }
        </FormRow>
        <FormRow>
            <FormLabel>Email:</FormLabel>
            <FormInput size="30" name="email"
                         onChange={() => {clearErrors("email"); clearErrors("confirm_email");}}
                         ref={register({
                required: true,
                pattern: /^\S+@\S+$/i,
                validate: () => getValues("email") === getValues("confirm_email")
            })} defaultValue={(aUser) ? aUser.email : ""} type="text"/>
            { (errors.email && errors.email.type === "required") &&
            <>{(!isAdminForm) && <StyledLabel>&nbsp;</StyledLabel>}<Error>Email is required</Error></> }
            { (errors.email && errors.email.type === "pattern") &&
            <>{(!isAdminForm) && <StyledLabel>&nbsp;</StyledLabel>}<Error>Email is not valid</Error></> }
            { (errors.email && (errors.email.type !== "required" && errors.email.type !== "pattern")) &&
            <>{(!isAdminForm) && <StyledLabel>&nbsp;</StyledLabel>}<Error>Email and Confirm Email must be the same</Error></> }
        </FormRow>
        <FormRow>
            <FormLabel>Confirm Email:</FormLabel>
            <FormInput size="30" name="confirm_email"
                 onChange={() => {clearErrors("email"); clearErrors("confirm_email");}}
                         ref={register({
                required: true,
                pattern: /^\S+@\S+$/i,
                validate: () => getValues("email") === getValues("confirm_email")
            })} defaultValue={(aUser) ? aUser.email : ""} type="text"/>
            { (errors.confirm_email && errors.confirm_email.type === "required") &&
            <>{(!isAdminForm) && <StyledLabel>&nbsp;</StyledLabel>}<Error>Confirm Email is required</Error></> }
            { (errors.confirm_email && errors.confirm_email.type === "pattern") &&
            <>{(!isAdminForm) && <StyledLabel>&nbsp;</StyledLabel>}<Error>Confirm Email is not valid</Error></> }
            { (errors.confirm_email && (errors.confirm_email.type !== "required" &&
                errors.confirm_email.type !== "pattern")) &&
            <>{(!isAdminForm) && <StyledLabel>&nbsp;</StyledLabel>}<Error>Email and Confirm Email must be the same</Error></> }
        </FormRow>
        <FormRow>
            <FormLabel>{(!isAdminForm) ? "Change " : ""}Password:</FormLabel>
            <FormInput size="30" name="password"

                         onChange={() => {clearErrors("password"); clearErrors("confirm_password");}}
                         ref={register({
                required: isAdminForm,
                minLength: MIN_PASSWORD_LEN,
                validate: () => getValues("password") === getValues("confirm_password")
            })} defaultValue="" type="text"/>
            { (errors.password && errors.password.type === "minLength") &&
            <>
                {(!isAdminForm) && <StyledLabel>&nbsp;</StyledLabel>}
                <Error>Password should be minimum of {MIN_PASSWORD_LEN} characters</Error>
            </> }
            { (errors.password && errors.password.type !== "required") &&
            <>{(!isAdminForm) && <StyledLabel>&nbsp;</StyledLabel>}<Error>Password and Confirm Password must be the same</Error></> }
        </FormRow>
        <FormRow>
            <FormLabel>Confirm Password:</FormLabel>
            <FormInput size="30" name="confirm_password"
                         onChange={() => {clearErrors("password"); clearErrors("confirm_password");}}
                         ref={register({
                             required: isAdminForm,
                minLength: MIN_PASSWORD_LEN,
                validate: () => getValues("password") === getValues("confirm_password")
            })} defaultValue="" type="text"/>
            { (errors.confirm_password && errors.confirm_password.type === "minLength") &&
            <>
                <StyledLabel>&nbsp;</StyledLabel>
                <Error>Confirm Password should be minimum of {MIN_PASSWORD_LEN} characters</Error>
            </> }
            { (errors.confirm_password && errors.confirm_password.type !== "required") &&
            <>{(!isAdminForm) && <StyledLabel>&nbsp;</StyledLabel>}<Error>Password and Confirm Password must be the same</Error></> }
        </FormRow>
        <FormRow>
            <FormLabel>&nbsp;</FormLabel>
            <SecondaryButton id="update_submit" name="commit"
                             type="submit">{(isAdminForm) ? "Add User": (aUser) ? "Update": "Create"}</SecondaryButton>&nbsp;&nbsp;
            <Link to={(aUser) ? `/users/${slug}`: '/users/'}>Cancel</Link>
        </FormRow>
    </Form>);
};


export default UserForm;