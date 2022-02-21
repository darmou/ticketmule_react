import React, { useContext } from "react";
import { useQuery } from "react-query";
import TicketmuleNetwork from "../utils/ticketmuleNetworkClass";
import { TicketContext } from "../application";
import { RESOURCE_TYPES } from "../types/types";
import { useSSE } from "react-hooks-sse";
import ResourceStore from "../actions/resourceStore";
import { getQueryKey } from "../utils/displayUtils";

const useGetResource = (id: number, resourceType: RESOURCE_TYPES) => {
    const { state, dispatch } = useContext(TicketContext);
    const { user, aUser, contact, ticket } = state;

    const getResource = () => {
        switch (resourceType) {
            case RESOURCE_TYPES.CONTACT:
                return contact;
            case RESOURCE_TYPES.USER:
                return aUser;
            default:
                return ticket;
        }
    };

    const queryKey = getQueryKey(resourceType);
    const ticketMule = new TicketmuleNetwork(user);
    const last = useSSE(`${resourceType}`, {
        id: null,
        updated_at: null
    });
    const resource = getResource();
    const { data, isLoading } = useQuery(queryKey, () =>
        ticketMule.fetchResource(id, `${resourceType}s`), { refetchOnMount: false,
        refetchOnWindowFocus: false, enabled: (user != null &&
            (resource == null ||
                (last.id != null && last.id === resource.id && last.updated_at !== resource.updated_at) ||
                resource.id !== id)) }
    );

    React.useEffect(() => {
        if (data && !isLoading && JSON.stringify(data['data']) !== JSON.stringify(resource)) {
            dispatch({action_fn: ResourceStore.setResource, resource: data, resourceType});
        }
    }, [dispatch, data, resource]);

    if (resource && resource.id === id) {
        return resource;
    } else if (data) {
        return data;
    } else {
        return null;
    }
};

export default useGetResource;