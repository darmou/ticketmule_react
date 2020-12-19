import React from "react";
import { useParams} from "react-router-dom";
import useGetTicket from "../../hooks/useGetTicket";
import TicketForm from "./TicketForm";
import {queryCache, useMutation} from "react-query";
import useTicketmule from "../../hooks/useTicketMule";
import TicketStore from "../../actions/ticketStore";
import { RESOURCE_TYPES, Context } from "../../types/types";

interface Props {
    context: Context
}

const TicketEdit = ({context} : Props) => {
    const { state, dispatch } = context;
    const { user } = state;
    const { slug } = useParams();
    const ticket = useGetTicket(parseInt(slug));

    const ticketMule = useTicketmule();
    const [editTheTicket] = useMutation(
        ticketMule.updateResource.bind(this, state, RESOURCE_TYPES.TICKET),
        {
            onSuccess: async () => {
                // Query Invalidations
                await queryCache.invalidateQueries('ticket');
            },
        }
    );

    const editTicket = (ticket) => {
        dispatch({action_fn: TicketStore.update, aTicket: ticket});
    };

    return (<>
        <h2>Editing ticket #{slug}</h2>
        <TicketForm addOrUpdate={editTicket} user={user} formAction={editTheTicket} slug={slug} ticket={ticket}/>

    </>);
};


export default TicketEdit;