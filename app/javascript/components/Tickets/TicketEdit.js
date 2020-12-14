import React from "react";
import { useParams} from "react-router-dom";
import useGetTicket from "../../hooks/useGetTicket";
import TicketForm from "./TicketForm";
import {queryCache, useMutation} from "react-query";
import useTicketmule from "../../hooks/useTicketMule";
import { PropTypes } from "prop-types";
import TicketStore from "../../actions/ticketStore";
import { RESOURCE_TYPES } from "../../utils/types";

const TicketEdit = ({context}) => {
    const { state, dispatch } = context;
    const { user } = state;
    const { slug } = useParams();
    const ticket = useGetTicket(slug);

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

TicketEdit.propTypes = {
    context: PropTypes.object
};

export default TicketEdit;