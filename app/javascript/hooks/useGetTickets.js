import React, { useContext } from "react";
import { useQuery } from "react-query";
import TicketmuleNetwork from "../utils/ticketmuleNetworkClass";
import TicketStore from "../actions/ticketStore";
import { TicketContext } from "../packs/application";
import usePrevious from "./usePrevious";
import { RESOURCE_TYPES } from "../utils/types";

const useGetTickets = () => {
    const { state, dispatch } = useContext(TicketContext);
    const { tickets, ticketPageInfo } = state;
    const { currentPage, resourceCount, lastPage, perPage, searchString } = ticketPageInfo;
    const prevPage = usePrevious(currentPage);
    const prevPerPage = usePrevious(perPage);
    const prevSearchString = usePrevious(searchString);
    const ticketMule = new TicketmuleNetwork(state.user);

    const { data, isLoading } = useQuery(`tickets`, () =>
        ticketMule.fetchResources(currentPage, perPage, null, RESOURCE_TYPES.TICKET, searchString), { refetchOnMount: false,
        refetchOnWindowFocus: false,
        enabled: (state.user != null &&
            (tickets == null ||
                prevPage !== currentPage ||
                prevSearchString !== searchString ||
                prevPerPage !== perPage)) }
    );

    React.useEffect(() => {
        if (data && !isLoading && JSON.stringify(data['data']) !== JSON.stringify(tickets)) {
            dispatch({action_fn: TicketStore.setPageData, pageInfoType: "ticketPageInfo", type: "tickets", pageData: data});
        }
    }, [dispatch, data, currentPage, tickets]);

    if (tickets && lastPage) {
        return { tickets, currentPage, resourceCount, lastPage, isLoading };
    } else {
        return { tickets: null, currentPage: 1, lastPage: null, isLoading };
    }
};

export default useGetTickets;

