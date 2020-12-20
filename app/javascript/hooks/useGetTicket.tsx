import React, { useContext } from "react";
import { useQuery } from "react-query";
import TicketmuleNetwork from "../utils/ticketmuleNetworkClass";
import TicketStore from "../actions/ticketStore";
import { TicketContext } from "../packs/application";

const useGetTicket = (id: number) => {
    const { state, dispatch } = useContext(TicketContext);
    const { user, ticket } = state;
    const ticketMule = new TicketmuleNetwork(user);
    const { data, isLoading } = useQuery("ticket", () =>
        ticketMule.fetchTicket(id), { refetchOnMount: false,
        refetchOnWindowFocus: false, enabled: (user != null && (ticket == null || ticket.id !== id)) }
    );

    React.useEffect(() => {
        if (data && !isLoading) {
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

export default useGetTicket;