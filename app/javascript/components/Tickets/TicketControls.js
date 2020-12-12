import React, {Fragment} from "react";
import { pure } from "recompose";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import PrimaryButton from "../PrimaryButton";
import { useLocation, useNavigate } from "react-router-dom";
import SecondaryButton from "../ComponentLibrary/SecondaryButton";
import FieldStyled from "../ComponentLibrary/FieldStyled";
import PropTypes from "prop-types";

const newResource = (event, navigate, resourceType) => {
    navigate(`/${resourceType}/new`);
};

const InputFeedback = styled.div`
    color: red;
`;

const TicketControls = ({loggedIn}) => {
    const { register, handleSubmit, errors } = useForm();
    const navigate = useNavigate();
    const location = useLocation();

    const buttons = (location != null && !location.pathname.includes('/admin')) ?
        (<Fragment><PrimaryButton click={e => newResource(e, navigate, 'tickets')} text="New ticket"/>
            <PrimaryButton click={e => newResource(e, navigate, 'contacts')} text="New Contact"/></Fragment>) : null;

    const onSubmit = (values) => {
        navigate(`/tickets/${values.jumpId}`);
    };

    if (loggedIn === false) return null;

    return (<>
        {buttons}
        <RightContainerStyled>
            <h3>Jump to Ticket</h3>
            <form onSubmit={handleSubmit(onSubmit.bind(this))}>
                <p>
                    <label htmlFor="jumpId"><em>Enter a ticket number:</em></label><br/>
                    <FieldStyled
                        name="jumpId"
                        type="text"
                        FieldStyled
                        ref={register({required: true, pattern: /^\d+$/})}
                        className={
                            errors.jumpId ? 'error' : ''
                        }
                    />
                    <SecondaryButton type="submit">
                        Go
                    </SecondaryButton>
                    {errors.jumpId && (
                        <InputFeedback>{(errors.jumpId.type === 'pattern') ? "Must be an integer only." : "Please enter ticket number."}</InputFeedback>
                    )}
                </p>
            </form>
        </RightContainerStyled>
    </>);
};

TicketControls.propTypes = {
    loggedIn: PropTypes.bool,
    touched: PropTypes.bool,
    errors: PropTypes.object,
    isSubmitting: PropTypes.bool,
    values: PropTypes.object
};

const RightContainerStyled = styled.div`
    margin-top: 20px;
    h3 {
        padding: 0 0 2px 0;
        color: #90af4c;
        border-bottom: 1px dotted #bbb;
        text-shadow: 0 1px 0 #fff;
    }
    
    p {
        color: #666;
    }
    
    em {
        font-style: italic;
    }
`;

export default pure(TicketControls);