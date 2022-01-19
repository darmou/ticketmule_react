import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import SecondaryButton from "../ComponentLibrary/SecondaryButton";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import { StyledForm, StyledLabel, StyledInput, Row } from "../ComponentLibrary/FormComponentsStyled";
import { onSubmitForm } from "../../utils/displayUtils";
import { RESOURCE_TYPES } from "../../types/types";

const PaddedTextarea = styled.textarea`
    padding-right: 9px !important;
`;

const ContactForm = ({formAction, slug, contact}) => {
    const { register, handleSubmit } = useForm();

    const onSubmit = async (data) => {
        await onSubmitForm(data, RESOURCE_TYPES.CONTACT, formAction);
    };

    return(<StyledForm acceptCharset="UTF-8" onSubmit={handleSubmit(onSubmit.bind(this))}>
        <Row>
            <StyledLabel>First name:</StyledLabel>
            <StyledInput name="first_name" {...register("first_name")} defaultValue={(contact) ? contact.first_name : ""} type="text"/>
        </Row>
        <Row>
            <StyledLabel>Last name:</StyledLabel>
            <StyledInput name="last_name" {...register("last_name")} defaultValue={(contact) ? contact.last_name : ""} type="text"/>
        </Row>
        <Row>
            <StyledLabel>Email:</StyledLabel>
            <StyledInput name="email" {...register("email")} defaultValue={(contact) ? contact.email : ""} type="text"/>
        </Row>
        <Row>
            <StyledLabel>Mobile phone:</StyledLabel>
            <StyledInput name="mobile_phone" {...register("mobile_phone")} defaultValue={(contact) ? contact.mobile_phone : ""} type="text"/>
        </Row>
        <Row>
            <StyledLabel>Office phone:</StyledLabel>
            <StyledInput name="office_phone" {...register("office_phone")} defaultValue={(contact) ? contact.office_phone : ""} type="text"/>
        </Row>

        <Row>
            <StyledLabel>Affiliation:</StyledLabel>
            <StyledInput name="affiliation" {...register("affiliation")} defaultValue={(contact) ? contact.affiliation : ""} type="text"/>
        </Row>

        <Row>
            <StyledLabel>Notes: </StyledLabel>
            <PaddedTextarea defaultValue={(contact) ? contact.notes : ""} name="notes" {...register("notes")} cols="45" rows="6"/>
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