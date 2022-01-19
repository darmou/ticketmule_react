import React, { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ContactForm from "./ContactForm";
import { useMutation } from "react-query";
import useTicketmule from "../../hooks/useTicketMule";
import useGetResource from "../../hooks/useGetResource";
import { TicketContext } from "../../packs/application";
import { Contact, RESOURCE_TYPES } from "../../types/types";
import ResourceStore from "../../actions/resourceStore";
import { queryClient } from "../../utils/network";

const ContactEdit = () => {
    const { state, dispatch } = useContext(TicketContext);
    const { user } = state;
    const { slug } = useParams();
    const contact = useGetResource(parseInt(slug), RESOURCE_TYPES.CONTACT);
    const navigate = useNavigate();

    const ticketMule = useTicketmule();
    const {mutate: editTheContact} = useMutation(
        ticketMule.updateResource.bind(this, state, RESOURCE_TYPES.CONTACT, parseInt(slug)),
        {
            onSuccess: async (contact: Contact) => {
                dispatch({action_fn: ResourceStore.setResource, resource: contact, ResourceType: RESOURCE_TYPES.CONTACT});
                // Query Invalidations
                queryClient.removeQueries("contact", { exact: true });
                navigate(`/contacts/${contact.id}`);
            },
        }
    );


    return (<>
        {(contact) &&
            <>
        <h2>Editing contact {contact.full_name}</h2>
            <ContactForm user={user} formAction={editTheContact} slug={slug} contact={contact}/>
            </>
        }
    </>);
};

export default ContactEdit;