import React, { useContext } from "react";
import { useQuery } from "react-query";
import TicketmuleNetwork from "../utils/ticketmule_network_class";
import TicketStore from "../actions/ticket_store";
import { TicketContext } from "../packs/application";

const useGetTickets = () => {
    const { state, dispatch } = useContext(TicketContext);
    const { user, tickets } = state;
    const ticketMule = new TicketmuleNetwork(user);

    const { data, isLoading } = useQuery(`tickets`, () =>
        ticketMule.fetchTickets(), { refetchOnMount: false,
        refetchOnWindowFocus: false,
        enabled: (user != null && tickets == null) }
    );


    React.useEffect(() => {
        if (data && !isLoading && !tickets) {
            dispatch({action_fn: TicketStore.setTickets, tickets: data});
        }
    }, [dispatch, data, tickets]);

    if (tickets) {
        return { tickets: tickets, isLoading };
    } else if (data) {
        return { tickets: data, isLoading };
    } else {
        return { tickets: [], isLoading };
    }
};

export default useGetTickets;

