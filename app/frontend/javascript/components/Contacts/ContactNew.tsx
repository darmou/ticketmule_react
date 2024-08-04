import React, { useContext } from "react";
import { useMutation } from "react-query";
import useTicketmule from "../../hooks/useTicketMule";
import { useNavigate } from "react-router-dom";
import ResourceStore from "../../actions/resourceStore";
import ContactForm from "./ContactForm";
import { TicketContext } from "../../application";
import { Contact, RESOURCE_TYPES } from "../../types/types";
import { queryClient } from "../../utils/network";

const ContactNew = () => {
    const { state, dispatch } = useContext(TicketContext);
    const { user } = state;
    const navigate = useNavigate();
    const ticketMule = useTicketmule();

    const {mutate: addTheContact} = useMutation(
        ticketMule.addResource.bind(this, state, 'contacts'),
        {
            onSuccess: async (contact: Contact) => {
                addContact(addContact);
                // Query Invalidations
                queryClient.removeQueries("contacts", { exact: true });
                navigate(`/contacts/${contact.id}`);
            },
        }
    );

    const addContact = (contact) => {
        //We want to just set the curret ticket as we do not know what page we are on
        dispatch({action_fn: ResourceStore.setResource, resource: contact, resourceType: RESOURCE_TYPES.CONTACT});
    };

    return (<>
        <h2>New contact</h2>
        <ContactForm formAction={addTheContact} user={user} contact={null}/>
    </>);
};


export default ContactNew;