import React from "react";
import { TicketStyled } from "./Ticket";
import { useParams} from "react-router-dom";
import useGetTicket from "../hooks/useGetTicket";
import TicketForm from "./TicketForm";
import {queryCache, useMutation} from "react-query";
import useTicketmule from "../hooks/useTicketMule";
import { PropTypes } from "prop-types";
import TicketStore from "../actions/ticketStore";

const TicketEdit = ({context}) => {
    const { state, dispatch } = context;
    const { slug } = useParams();
    const ticket = useGetTicket(slug);

    const ticketMule = useTicketmule();
    const [editTheTicket] = useMutation(
        ticketMule.updateTicket.bind(this, state),
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

    return (<TicketStyled>
        <h2>Editing ticket #{slug}</h2>
        <TicketForm addOrUpdate={editTicket} formAction={editTheTicket} slug={slug} ticket={ticket}/>

    </TicketStyled>);
};

TicketEdit.propTypes = {
    context: PropTypes.object
};

export default TicketEdit;