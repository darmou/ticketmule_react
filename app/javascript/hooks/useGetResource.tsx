import React, { useContext } from "react";
import { useQuery } from "react-query";
import TicketmuleNetwork from "../utils/ticketmuleNetworkClass";
import { TicketContext } from "../application";
import { RESOURCE_TYPES } from "../types/types";
import { useSSE } from "react-hooks-sse";
import { getQueryKey } from "../utils/displayUtils";
import { queryClient } from "../utils/network";
import usePrevious from "./usePrevious";
import useGetOptions from "./useGetOptions";

const useGetResource = (id: number, resourceType: RESOURCE_TYPES) => {
    const { state } = useContext(TicketContext);
    const { user } = state;

    const queryKey = getQueryKey(resourceType);
    const { refetch } = useGetOptions(true);
    const ticketMule = new TicketmuleNetwork(user);
    const last = useSSE(`${resourceType}`, {
        id: null,
        updated_at: null
    });
    const fetchData = async () => {
        await refetch();
    }
    const prevLast = usePrevious(last);
    //Update query cache if something is updated from SSE
    if (last && last.id && (!prevLast || (prevLast && JSON.stringify(last) !== JSON.stringify(prevLast)))) {
        queryClient.setQueryData(queryKey, last);
        fetchData();
    }

    const { data, isLoading } = useQuery(queryKey, () =>
        ticketMule.fetchResource(id, `${resourceType}s`), { refetchOnMount: false,
        refetchOnWindowFocus: false, enabled: (user != null) }
    );

    if (data && !isLoading) {
        return data;
    } else {
        return null;
    }
};

export default useGetResource;