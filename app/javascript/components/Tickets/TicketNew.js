import React from "react";
import TicketForm from "./TicketForm";
import { queryCache, useMutation } from "react-query";
import useTicketmule from "../../hooks/useTicketMule";
import TicketStore from "../../actions/ticketStore";
import { PropTypes } from "prop-types";
import { useNavigate } from "react-router-dom";

const TicketNew = ({context}) => {
    const { dispatch, state  } = context;
    const { user } = state;
    const navigate = useNavigate();
    const ticketMule = useTicketmule();

    const [addTheTicket] = useMutation(
        ticketMule.addResource.bind(this, state, 'tickets'),
        {
            onSuccess: async (ticket) => {
                addTicket(ticket);
                // Query Invalidations
                await queryCache.invalidateQueries('tickets');
                navigate(`/tickets/${ticket.id}`);
            },
        }
    );

    const addTicket = (ticket) => {
        //We want to just set the current ticket as we do not know what page we are on
        dispatch({action_fn: TicketStore.setTicket, ticket});
    };

    return (<>
        <h2>New ticket</h2>
        <TicketForm addOrUpdate={addTheTicket} user={user} ticket={null}/>
    </>);
};

TicketNew.propTypes = {
    context: PropTypes.object
};

export default TicketNew;

