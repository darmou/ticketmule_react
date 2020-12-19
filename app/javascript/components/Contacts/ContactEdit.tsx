import React, { useContext } from "react";
import {useNavigate, useParams} from "react-router-dom";
import ContactForm from "./ContactForm";
import {queryCache, useMutation} from "react-query";
import useTicketmule from "../../hooks/useTicketMule";
import ContactStore from "../../actions/contactStore";
import useGetContact from "../../hooks/useGetContact";
import { TicketContext } from "../../packs/application";
import { Contact, RESOURCE_TYPES } from "../../types/types";

const ContactEdit = () => {
    const { state, dispatch } = useContext(TicketContext);
    const { user } = state;
    const { slug } = useParams();
    const contact = useGetContact(parseInt(slug));
    const navigate = useNavigate();

    const ticketMule = useTicketmule();
    const [editTheContact] = useMutation(
        ticketMule.updateResource.bind(this, state, RESOURCE_TYPES.CONTACT),
        {
            onSuccess: async (contact: Contact) => {
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

    return (<>
        {(contact) &&
            <>
        <h2>Editing contact {contact.full_name}</h2>
            <ContactForm addOrUpdate={editContact} user={user} formAction={editTheContact} slug={slug} contact={contact}/>
            </>
        }
    </>);
};

export default ContactEdit;