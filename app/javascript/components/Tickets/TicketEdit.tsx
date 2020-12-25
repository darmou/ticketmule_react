import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import useGetResource from "../../hooks/useGetResource";
import TicketForm from "./TicketForm";
import { queryCache, useMutation } from "react-query";
import useTicketmule from "../../hooks/useTicketMule";
import ResourceStore from "../../actions/resourceStore";
import { Context, RESOURCE_TYPES, Ticket } from "../../types/types";

interface Props {
    context: Context
}

const TicketEdit = ({context} : Props) => {
    const { state, dispatch } = context;
    const { user } = state;
    const navigate = useNavigate();
    const { slug } = useParams();
    const ticket = useGetResource(parseInt(slug), RESOURCE_TYPES.TICKET);

    const ticketMule = useTicketmule();
    const [editTheTicket] = useMutation(
        ticketMule.updateResource.bind(this, state, RESOURCE_TYPES.TICKET, parseInt(slug)),
        {
            onSuccess: async (ticket: Ticket) => {
                dispatch({action_fn: ResourceStore.setResource, ticket, resourceType: RESOURCE_TYPES.TICKET});
                dispatch({action_fn: ResourceStore.update, resource: ticket, resourceType: RESOURCE_TYPES.TICKET});
                // Query Invalidations
                await queryCache.invalidateQueries('ticket');
                navigate(`/tickets/${ticket.id}`);
            },
        }
    );

    return (<>
        <h2>Editing ticket #{slug}</h2>
        <TicketForm user={user} formAction={editTheTicket} slug={slug} ticket={ticket}/>

    </>);
};


export default TicketEdit;