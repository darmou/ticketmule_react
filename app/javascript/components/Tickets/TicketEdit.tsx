import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import useGetResource from "../../hooks/useGetResource";
import TicketForm from "./TicketForm";
import { UseMutateFunction, useMutation } from "react-query";
import useTicketmule from "../../hooks/useTicketMule";
import ResourceStore from "../../actions/resourceStore";
import { Context, RESOURCE_TYPES, Ticket } from "../../types/types";
import { queryClient } from "../../utils/network";

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
    const {mutate: editTheTicket} = useMutation(
        ticketMule.updateResource.bind(this, state, RESOURCE_TYPES.TICKET, parseInt(slug)),
        {
            onSuccess: async (ticket: Ticket) => {
                dispatch({action_fn: ResourceStore.setResource, ticket, resourceType: RESOURCE_TYPES.TICKET});
                dispatch({action_fn: ResourceStore.update, resource: ticket, resourceType: RESOURCE_TYPES.TICKET});
                // Query Invalidations
                queryClient.removeQueries("ticket", { exact: true });
                navigate(`/tickets/${ticket.id}`);
            },
        }
    );

    return (<>
        <h2>Editing ticket #{slug}</h2>
        <TicketForm user={user} formAction={editTheTicket as unknown as UseMutateFunction<Ticket, unknown, string, unknown>} slug={slug} ticket={ticket}/>

    </>);
};


export default TicketEdit;