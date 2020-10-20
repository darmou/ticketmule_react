import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ErrorNotificationStyled, FlashStyled, SecondaryButtonStyled} from "./Login";
import { useForm } from "react-hook-form";
import useGetOptions from "../hooks/useGetOptions";
import PropTypes from "prop-types";

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
           if (key.endsWith("_id") || key.endsWith("_by")) {
               data[key] = (data[key]) ? parseInt(data[key]) : null;
           }
        });
        return data;
    };

    const onSubmit = async (data) => {
        isLoading = true;
        data = cleanData(data);
        try {
            const toSend = {
                ticket: data
            };
            await formAction(JSON.stringify(toSend));
            addOrUpdate({...ticket, ...data});
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
            <select defaultValue={(ticket.contact) ? ticket.contact.id : null} name="contact_id" ref={register}>
                <option value=""></option>
                { (options && Object.prototype.hasOwnProperty.call(options, 'contacts')) && options.contacts.map(contact => {
                    return (<option key={`contact_${contact.id}`} value={contact.id}>{contact.first_name} {contact.last_name}</option>);
                })
                }
            </select>
        </Row>
        <Row>
            <StyledLabel>Group:</StyledLabel>
            <select defaultValue={(ticket.group) ? ticket.group.id : null} name="group_id" ref={register}>
                <option  value=""></option>
                { (options && Object.prototype.hasOwnProperty.call(options, 'groups')) && options.groups.map(group => {
                    return (<option  key={`group_${group.id}`} value={group.id}>{group.name}</option>);
                })
                }
            </select>
        </Row>
        <Row>
            <StyledLabel>Time Type:</StyledLabel>
            <select defaultValue={(ticket.time_type) ? ticket.time_type.id : null}  name="time_type_id" ref={register}>
                <option value=""></option>
                { (options && Object.prototype.hasOwnProperty.call(options, 'time_types')) && options.time_types.map(time_type => {
                    return (<option key={`time_type_${time_type.id}`} value={time_type.id}>{time_type.name}</option>);
                })
                }
            </select>
        </Row>
        <Row>
            <StyledLabel>Priority:</StyledLabel>
            <select  defaultValue={(ticket.priority) ? ticket.priority.id : null} name="priority_id" ref={register}>
                <option value=""></option>
                { (options && Object.prototype.hasOwnProperty.call(options, 'priorities')) && options.priorities.map(priority => {
                    return (<option key={`time_type_${priority.id}`} value={priority.id}>{priority.name}</option>);
                })
                }
            </select>
        </Row>
        <Row>
            <StyledLabel>Owner:</StyledLabel>
            <select defaultValue={(ticket.owner) ? ticket.owner.id : null} name="owned_by" ref={register}>
                <option value=""></option>
                { (options && Object.prototype.hasOwnProperty.call(options, 'owners')) && options.owners.map(owner => {
                    return (<option key={`owner_${owner.id}`} value={owner.id}>{owner.username}</option>);
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