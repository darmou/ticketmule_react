import React, { useContext } from "react";
import AResourceStyled from "../ComponentLibrary/AResourceStyled";
import {useNavigate, useParams} from "react-router-dom";
import ContactForm from "./ContactForm";
import {queryCache, useMutation} from "react-query";
import useTicketmule from "../../hooks/useTicketMule";
import ContactStore from "../../actions/contactStore";
import useGetContact from "../../hooks/useGetContact";
import { TicketContext } from "../../packs/application";
import {RESOURCE_TYPES} from "../../utils/types";

const ContactEdit = () => {
    const { state, dispatch } = useContext(TicketContext);
    const { user } = state;
    const { slug } = useParams();
    const contact = useGetContact(slug);
    const navigate = useNavigate();

    const ticketMule = useTicketmule();
    const [editTheContact] = useMutation(
        ticketMule.updateResource.bind(this, state, RESOURCE_TYPES.CONTACT),
        {
            onSuccess: async (contact) => {
                debugger;
                editContact(contact);
                // Query Invalidations
                await queryCache.invalidateQueries('contact');
                navigate(`/contacts/${contact.id}`);
            },
        }
    );

    const editContact = (contact) => {
        dispatch({action_fn: ContactStore.setContact, contact});
    };

    return (<AResourceStyled>
        {(contact) &&
            <>
        <h2>Editing contact {contact.full_name}</h2>
            <ContactForm addOrUpdate={editContact} user={user} formAction={editTheContact} slug={slug} contact={contact}/>
            </>
        }
    </AResourceStyled>);
};

export default ContactEdit;