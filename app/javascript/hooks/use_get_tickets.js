import React, { useContext } from "react";
import { useQuery } from "react-query";
import PropTypes from "prop-types";
import { ticketsTypes } from "../actions/ticket_store";
import TicketmuleNetwork from "../utils/ticketmule_network_class";
import TicketStore from "../actions/ticket_store";
import { TicketContext } from "../packs/application";

const useGetTickets = (type = null) => {
    const { state, dispatch } = useContext(TicketContext);
    const { user, tickets } = state;
    const ticketMule = new TicketmuleNetwork(user);
    type = (type) ? type : ticketsTypes.NOT_CLOSED;

    const { data, isLoading } = useQuery(`tickets-${type}`, () =>
        ticketMule.fetchTickets(type), { refetchOnMount: false,
        refetchOnWindowFocus: false,
        enabled: (user != null && tickets[type] == null) }
    );


    React.useEffect(() => {
        if (data && !isLoading && !tickets[type]) {
            dispatch({action_fn: TicketStore.setTickets, tickets: data, type});
        }
    }, [dispatch, data, tickets[type], type]);

    if (tickets[type]) {
        return { tickets: tickets[type], isLoading };
    } else if (data) {
        return { tickets: data, isLoading };
    } else {
        return { tickets: [], isLoading };
    }
};

useGetTickets.propTypes = {
    type: PropTypes.string
};

export default useGetTickets;

