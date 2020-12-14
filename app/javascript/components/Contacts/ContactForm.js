import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import SecondaryButton from "../ComponentLibrary/SecondaryButton";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import { StyledForm, StyledLabel, StyledInput, Row } from "../ComponentLibrary/TableStyles";
import { onSubmitForm } from "../../utils/displayUtils";


const PaddedTextarea = styled.textarea`
    padding-right: 9px !important;
`;

const ContactForm = ({addOrUpdate, formAction, slug, contact}) => {
    const { register, handleSubmit } = useForm();

    const onSubmit = async (data) => {
        await onSubmitForm(data, "contact", formAction, addOrUpdate, contact);
    };


    return(<StyledForm acceptCharset="UTF-8" onSubmit={handleSubmit(onSubmit.bind(this))}>
        <Row>
            <StyledLabel>First name:</StyledLabel>
            <StyledInput name="first_name" ref={register} defaultValue={(contact) ? contact.first_name : ""} type="text"/>
        </Row>
        <Row>
            <StyledLabel>Last name:</StyledLabel>
            <StyledInput name="last_name" ref={register} defaultValue={(contact) ? contact.last_name : ""} type="text"/>
        </Row>
        <Row>
            <StyledLabel>Email:</StyledLabel>
            <StyledInput name="email" ref={register} defaultValue={(contact) ? contact.email : ""} type="text"/>
        </Row>
        <Row>
            <StyledLabel>Mobile phone:</StyledLabel>
            <StyledInput name="mobile_phone" ref={register} defaultValue={(contact) ? contact.mobile_phone : ""} type="text"/>
        </Row>
        <Row>
            <StyledLabel>Office phone:</StyledLabel>
            <StyledInput name="office_phone" ref={register} defaultValue={(contact) ? contact.office_phone : ""} type="text"/>
        </Row>

        <Row>
            <StyledLabel>Affiliation:</StyledLabel>
            <StyledInput name="affiliation" ref={register} defaultValue={(contact) ? contact.affiliation : ""} type="text"/>
        </Row>

        <Row>
            <StyledLabel>Notes: </StyledLabel>
            <PaddedTextarea defaultValue={(contact) ? contact.notes : ""} name="notes" ref={register} cols="45" rows="6"/>
        </Row>
        <Row>
            <StyledLabel>&nbsp;</StyledLabel>
            <SecondaryButton className="button" id="update_submit" name="commit" type="submit"
            >{(contact) ? "Update": "Create"}</SecondaryButton>&nbsp;&nbsp;
            <Link to={(contact) ? `/contacts/${slug}`: '/contacts/'}>Cancel</Link>
        </Row>
    </StyledForm>);
};

ContactForm.propTypes = {
    formAction: PropTypes.func,
    addOrUpdate: PropTypes.func,
    contact: PropTypes.object,
    user: PropTypes.object,
    slug: PropTypes.string
};

export default ContactForm;