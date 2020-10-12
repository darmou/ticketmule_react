import React, { Fragment } from "react";
import { pure } from "recompose";
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import styled from "styled-components";
import PrimaryButton from "./PrimaryButton";
import ButtonGradient from "../images/button-gradient.png";
import { useLocation, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const newTicket = (event, navigate) => {
   navigate("/tickets/new");
};

const newContact = (event) => {
    console.log(event);
};

const TicketControls = ({loggedIn}) => {
    const navigate = useNavigate();
    const location = useLocation();

    const buttons = (location != null && location.pathname !== '/admin') ?
        (<Fragment><PrimaryButton click={e => newTicket(e, navigate)} text="New ticket"/>
        <PrimaryButton click={newContact} text="New Contact"/></Fragment>) : null;

    if (loggedIn === false) return null;

    return (<Fragment>
            {buttons}
            <RightContainerStyled>
                <h3>Jump to Ticket</h3>
                <Formik
                    initialValues={{jump_id: 1}}
                    onSubmit={(values, {setSubmitting}) => {

                        setSubmitting(false);
                        navigate(`/tickets/${values.jump_id}`);
                    }}
                    validationSchema={Yup.object().shape({
                        jump_id: Yup.number()
                            .required('Required'),
                    })}
                >
                    {props => {
                        const {
                            touched,
                            errors,
                            values,
                        } = props;
                        return (
                            <Form>
                                <p>
                                    <label htmlFor="jump_id"><em>Enter a ticket number:</em></label><br/>
                                    <FieldStyled
                                        id="jump_id"
                                        name="jump_id"
                                        type="text"
                                        value={values.jump_id}

                                        className={
                                            errors.jump_id && touched.jump_id ? 'error' : ''
                                        }
                                    />
                                    {errors.jump_id && touched.jump_id && (
                                        <div className="input-feedback">{errors.jump_id}</div>
                                    )}


                                    <ButtonStyled type="submit">
                                        Go
                                    </ButtonStyled>
                                </p>

                            </Form>
                        );
                    }}
                </Formik>
            </RightContainerStyled>
        </Fragment>
    );
};

const FieldStyled = styled(Field)`
    padding: 4px;
    background: #fff;
    border: 1px solid #ccc;
    font: 12px Verdana,sans-serif;
    border-radius: 3px;
    width: 61px;
    margin-right: 5px;
`;

TicketControls.propTypes = {
    loggedIn: PropTypes.bool,
    touched: PropTypes.bool,
    errors: PropTypes.object,
    isSubmitting: PropTypes.bool,
    values: PropTypes.object,
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

const ButtonStyled = styled.button`
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
    background: #fff url(${ButtonGradient}) repeat-x 0 0;
    border-color: rgba(0,0,0,0.25) rgba(0,0,0,0.25) rgba(0,0,0,0.35);
    border-style: solid;
    border-width: 1px;
    text-decoration: none;
    text-shadow: 0 1px 1px rgba(255,255,255,0.65);
    outline: none;
    overflow: visible;
    margin-left: 20px;
    display: inline;
    line-height: 14px;
    &:hover {
      background-color: #f4f4f4;
      color: #666;
      pointer: cursor;
    }
`;

export default pure(TicketControls);