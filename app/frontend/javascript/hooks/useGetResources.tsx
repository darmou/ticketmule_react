import React, { useContext, useRef } from "react";
import { useQuery } from "react-query";
import TicketmuleNetwork from "../utils/ticketmuleNetworkClass";
import { getResourcePageInfo } from "../utils/displayUtils";
import { TicketContext } from "../application";
import usePrevious from "./usePrevious";
import ResourceStore from "../actions/resourceStore";
import { useSSE } from "react-hooks-sse";
import { queryClient } from "../utils/network";

const useGetResources = (resourceType) => {
    const { state, dispatch } = useContext(TicketContext);
    const { contactPageInfo, userPageInfo, ticketPageInfo } = state;
    const resourcePageInfo = getResourcePageInfo(resourceType, ticketPageInfo, contactPageInfo, userPageInfo);
    const { currentPage, resourceCount, lastPage, perPage, letterSelected, searchString } = resourcePageInfo;
    const prevPage = usePrevious(currentPage);
    const prevSearchString = usePrevious(searchString);
    const prevLetterSelected = usePrevious(letterSelected);
    const prevPerPage = usePrevious(perPage);
    const ticketMule = new TicketmuleNetwork(state.user);
    const last = useSSE(`${resourceType}`, {
        id: null,
        updated_at: null
    });
    const prevLast = usePrevious(last);
    const prevData = useRef(null);
    //Update query cache if something is updated from SSE
    if (last && last.id && (!prevLast || (prevLast && JSON.stringify(last) !== JSON.stringify(prevLast)))) {
        queryClient.setQueryData(`${resourceType}s`, (resources) => {
            let newResources;
            if (typeof resources === 'object' && 'data' in resources) {
                //@ts-ignore
                newResources = resources?.data?.map((resource) => {
                    if (resource.id === last.id) {
                        return last;
                    } else {
                        return resource;
                    }
                })
            }
            //@ts-ignore
            return  { data: newResources, pagy: resources?.pagy };
        });
    }

    const { data, isLoading, refetch } = useQuery(`${resourceType}s`, () =>
        ticketMule.fetchResources(currentPage, perPage, letterSelected, resourceType, searchString), { refetchOnMount: true,
        refetchOnWindowFocus: true,
        enabled: (state.user != null) }
    );
    prevData.current = usePrevious(data);

    React.useEffect(() => {
        const fetchData = async () => {
            await refetch();
        }

        if (prevPage !== currentPage ||
            prevLetterSelected !== letterSelected ||
            prevSearchString !== searchString ||
            prevPerPage !== perPage) {
            fetchData().catch(console.error);
        }
        if (data?.['pagy']?.['page'] && !isLoading && !prevData.current && data || (prevData.current && data && JSON.stringify(prevData.current.data) !== JSON.stringify(data.data))) {
            dispatch({action_fn: ResourceStore.setPageData, resourceType, pageData: data});
        }
    }, [prevSearchString, searchString, prevPerPage, perPage, prevPage, currentPage,
        prevLetterSelected, letterSelected, dispatch, prevData, data, currentPage]);

    if (data && lastPage) {
        return { [`${resourceType}s`]: data.data, currentPage, resourceCount, lastPage, isLoading, refetch };
    } else {
        return { [`${resourceType}s`]: null, currentPage: 1, lastPage: null, isLoading, refetch };
    }
};

export default useGetResources;