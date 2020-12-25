import React, { useContext } from "react";
import { useQuery } from "react-query";
import TicketmuleNetwork from "../utils/ticketmuleNetworkClass";
import { getResourcePageInfo } from "../utils/displayUtils";
import { TicketContext } from "../packs/application";
import usePrevious from "./usePrevious";
import { RESOURCE_TYPES } from "../types/types";
import ResourceStore from "../actions/resourceStore";
import { useSSE } from "react-hooks-sse";

const useGetResources = (resourceType) => {
    const { state, dispatch } = useContext(TicketContext);
    const { contacts, users, tickets, contactPageInfo, userPageInfo, ticketPageInfo } = state;
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
    const getResources = () => {
        switch (resourceType) {
            case RESOURCE_TYPES.CONTACT:
                return contacts;
            case RESOURCE_TYPES.USER:
                return users;
            default:
                return tickets;
        }
    };
    const resources = getResources();
    const aChangedResource = (last.id == null) ? null : resources.filter(aResource => last.id === aResource.id)[0];

    const { data, isLoading } = useQuery(`${resourceType}s`, () =>
        ticketMule.fetchResources(currentPage, perPage, letterSelected, resourceType, searchString), { refetchOnMount: false,
        refetchOnWindowFocus: false,
        enabled: (state.user != null &&
            (resources == null ||
                prevPage !== currentPage ||
                (last.id != null && aChangedResource != null && last.updated_at !== aChangedResource.updated_at) ||
                prevLetterSelected !== letterSelected ||
                prevSearchString !== searchString ||
                prevPerPage !== perPage)) }
    );

    React.useEffect(() => {
        if (data && !isLoading && JSON.stringify(data['data']) !== JSON.stringify(resources)) {
            dispatch({action_fn: ResourceStore.setPageData, resourceType, pageData: data});
        }
    }, [dispatch, data, currentPage, resources, resourceType]);

    if (resources && lastPage) {
        return { [`${resourceType}s`]: resources, currentPage, resourceCount, lastPage, isLoading };
    } else {
        return { [`${resourceType}s`]: null, currentPage: 1, lastPage: null, isLoading };
    }
};

export default useGetResources;