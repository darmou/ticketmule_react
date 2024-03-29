import React from "react";
import TicketForm from "./TicketForm";
import { UseMutateFunction, useMutation } from "react-query";
import useTicketmule from "../../hooks/useTicketMule";
import ResourceStore from "../../actions/resourceStore";
import { useNavigate } from "react-router-dom";
import { Context, RESOURCE_TYPES, Ticket } from "../../types/types";
import { queryClient } from "../../utils/network";

interface Props {
    context: Context
}

const TicketNew = ({context} : Props) => {
    const { dispatch, state  } = context;
    const { user } = state;
    const navigate = useNavigate();
    const ticketMule = useTicketmule();

    const {mutate: addTheTicket} = useMutation(
        ticketMule.addResource.bind(this, state, 'tickets'),
        {
            onSuccess: async (ticket: Ticket) => {
                addTicket(ticket);
                // Query Invalidations
                queryClient.removeQueries("tickets", { exact: true });
                navigate(`/tickets/${ticket.id}`);
            },
        }
    );

    const addTicket = (ticket) => {
        //We want to just set the current ticket as we do not know what page we are on
        dispatch({action_fn: ResourceStore.setResource, resource: ticket, resourceType: RESOURCE_TYPES.TICKET});
    };

    return (<>
        <h2>New ticket</h2>
        <TicketForm formAction={addTheTicket as unknown as UseMutateFunction<Ticket, unknown, string, unknown>} user={user} ticket={null}/>
    </>);
};


export default TicketNew;

