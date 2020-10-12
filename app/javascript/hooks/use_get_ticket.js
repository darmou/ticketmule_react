import React, { useContext } from "react";
import { useQuery } from "react-query";
import TicketmuleNetwork from "../utils/ticketmule_network_class";
import TicketStore from "../actions/ticket_store";
import { TicketContext } from "../packs/application";
import {PropTypes} from "prop-types";

const useGetTicket = (id) => {
    const { state, dispatch } = useContext(TicketContext);
    const { user, ticket } = state;
    const ticketMule = new TicketmuleNetwork(user);
    const { data, isLoading } = useQuery("ticket", () =>
        ticketMule.fetchTicket(id), { refetchOnMount: false,
        refetchOnWindowFocus: false, enabled: (user != null && (ticket == null || ticket.id !== id)) }
    );

    React.useEffect(() => {
        if (data && !isLoading && !ticket) {
            dispatch({action_fn: TicketStore.setTicket, ticket: data});
        }
    }, [dispatch, user, data, ticket]);

    if (ticket && ticket.id === id) {
        return ticket;
    } else if (data) {
        return data;
    } else {
        return null;
    }
};

useGetTicket.propTypes = {
    id: PropTypes.string
};

export default useGetTicket;