import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ErrorNotificationStyled, FlashStyled, SecondaryButtonStyled} from "./Login";
import { useForm } from "react-hook-form";
import useGetOptions from "../hooks/use_get_options";
import PropTypes from "prop-types";
import useTicketmule from "../hooks/use_ticketmule";
import TicketStore, {ticketsTypes} from "../actions/ticket_store";

const Row = styled.div`
  float: left;
  width: 100%;
  margin-bottom: 3px;
  &:last-child {
    margin-top: 10px;
  }
`;

const StyledLabel = styled.label`
  width: 20%;
  float: left;
  text-align: right;
  margin-right: 10px;
  line-height: 24px;
  &:hover {
    cursor: pointer;
  }
`;

const StyledInput = styled.input`
    width: 76%;
`;


const StyledForm = styled.form`
    width: 500px;
    input:hover, textarea:hover, select:hover {
        border: 1px solid #999;

    }
    input, select, textarea {
        padding: 4px;
        background: #fff;
        border: 1px solid #ccc;
    }
    textarea, select, input[type="text"] {
        float: left;
    }
    font: 12px Verdana,sans-serif;
`;

const TicketForm = ({addOrUpdate, formAction, slug, ticket}) => {
    const { register, handleSubmit, errors } = useForm();
    const { options } = useGetOptions();

    let isLoading = false;
    if (ticket == null) {
        return null;
    }

    const cleanData = (data) => {
        Object.keys(data).map(key => {
           if (key.endsWith("_id")) {
               data[key] = (data[key]) ? parseInt(data[key]) : null;
           }
        });
        return data;
    };

    const onSubmit = async (data) => {
        isLoading = true;

        try {
            const toSend = {
                ticket: cleanData(data)
            };
            await formAction(JSON.stringify(toSend));
            addOrUpdate(data, ticket.clsoed_at);
         } catch (error) {

         }
        isLoading = false;
    };


    return(<StyledForm acceptCharset="UTF-8" onSubmit={handleSubmit(onSubmit)}>
        <Row>
            <StyledLabel>Title:</StyledLabel>
            <StyledInput name="title" ref={register} defaultValue={ticket.title} type="text"/>
        </Row>
        <Row>
            <StyledLabel>Contact:</StyledLabel>
            <select name="contact" ref={register}>
                <option value="" selected={ticket.contact == null}></option>
                { (options && options.hasOwnProperty('contacts')) && options.contacts.map(contact => {
                    return (<option see={ticket.contact && ticket.contact.id === contact.id} key={`contact_${contact.id}`} value={contact.id}>{contact.first_name} {contact.last_name}</option>);
                })
                }
            </select>
        </Row>
        <Row>
            <StyledLabel>Group:</StyledLabel>
            <select name="group" ref={register}>
                <option value="" selected={ticket.group == null}></option>
                { (options && options.hasOwnProperty('groups')) && options.groups.map(group => {
                    return (<option selected={ticket.group && group.id === ticket.group.id} key={`group_${group.id}`} value={group.id}>{group.name}</option>);
                })
                }
            </select>
        </Row>
        <Row>
            <StyledLabel>Time Type:</StyledLabel>
            <select name="time_type" ref={register}>
                <option selected={ticket.time_type == null} value=""></option>
                { (options && options.hasOwnProperty('time_types')) && options.time_types.map(time_type => {
                    return (<option selected={ticket.time_type && time_type.id === ticket.time_type.id} key={`time_type_${time_type.id}`} value={time_type.id}>{time_type.name}</option>);
                })
                }
            </select>
        </Row>
        <Row>
            <StyledLabel>Priority:</StyledLabel>
            <select name="priority" ref={register}>
                <option selected={ticket.priority == null} value=""></option>
                { (options && options.hasOwnProperty('priorities')) && options.priorities.map(priority => {
                    return (<option selected={ticket.priority && priority.id === ticket.priority.id} key={`time_type_${priority.id}`} value={priority.id}>{priority.name}</option>);
                })
                }
            </select>
        </Row>
        <Row>
            <StyledLabel>Owner:</StyledLabel>
            <select name="owner" ref={register}>
                <option selected={ticket.owner == null} value=""></option>
                { (options && options.hasOwnProperty('owners')) && options.owners.map(owner => {
                    return (<option selected={ticket.owner && owner.id === ticket.owner.id} key={`owner_${owner.id}`} value={owner.id}>{owner.username}</option>);
                })
                }
            </select>
        </Row>
        <Row>
            <StyledLabel>Details: </StyledLabel>
            <textarea name="details" ref={register} cols="45" rows="6">{ticket.details}</textarea>
        </Row>
        <Row>
            <StyledLabel>&nbsp;</StyledLabel>
            <SecondaryButtonStyled className="button" id="update_submit" name="commit" type="submit"
                                   value="Update"/>&nbsp;&nbsp;
            <Link to={`/tickets/${slug}`}>Cancel</Link>
        </Row>
    </StyledForm>);
};

TicketForm.propTypes = {
    formAction: PropTypes.func,
    addOrUpdate: PropTypes.func,
    ticket: PropTypes.object,
    slug: PropTypes.string
};

export default TicketForm;