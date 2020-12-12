import React, { useContext } from "react";
import { useQuery } from "react-query";
import TicketmuleNetwork from "../utils/ticketmuleNetworkClass";
import { getResourcePageInfo } from "../utils/displayUtils";
import ContactStore from "../actions/contactStore";
import { TicketContext } from "../packs/application";
import usePrevious from "./usePrevious";
import { RESOURCE_TYPES } from "../utils/types";
import UserStore from "../actions/userStore";

const useGetPeople = (resourceType) => {
    const { state, dispatch } = useContext(TicketContext);
    const { contacts, users, contactPageInfo, userPageInfo, ticketPageInfo } = state;
    const resourcePageInfo = getResourcePageInfo(resourceType, ticketPageInfo, contactPageInfo, userPageInfo);
    const { currentPage, resourceCount, lastPage, perPage, letterSelected } = resourcePageInfo;
    const prevPage = usePrevious(currentPage);
    const prevLetterSelected = usePrevious(letterSelected);
    const prevPerPage = usePrevious(perPage);
    const ticketMule = new TicketmuleNetwork(state.user);

    const resources = ((resourceType, contacts, users) => {
        switch (resourceType) {
            case RESOURCE_TYPES.CONTACT:
                return contacts;
            case RESOURCE_TYPES.USER:
                return users;
        }
    })(resourceType, contacts, users);

    const { data, isLoading } = useQuery(`${resourceType}s`, () =>
        ticketMule.fetchResources(currentPage, perPage, letterSelected, resourceType), { refetchOnMount: false,
        refetchOnWindowFocus: false,
        enabled: (state.user != null && (resources == null ||
            prevLetterSelected !== letterSelected
            || prevPage !== currentPage
            || prevPerPage !== perPage)) }
    );

    React.useEffect(() => {
        if (data && !isLoading && JSON.stringify(data['data']) !== JSON.stringify(resources)) {
            switch (resourceType) {
                case RESOURCE_TYPES.CONTACT:
                    dispatch({action_fn: ContactStore.setContactsData, contactsData: data});
                    break;
                case RESOURCE_TYPES.USER:
                    dispatch({action_fn: UserStore.setUsersData, usersData: data});
                    break;
            }
        }
    }, [dispatch, data, currentPage, resources]);

    if (resources && lastPage) {
        return { [`${resourceType}s`]: resources, currentPage, resourceCount, lastPage, isLoading };
    } else {
        return { [`${resourceType}s`]: null, currentPage: 1, lastPage: null, isLoading };
    }
};

export default useGetPeople;