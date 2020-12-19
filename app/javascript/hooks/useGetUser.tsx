import React, { useContext } from "react";
import { useQuery } from "react-query";
import TicketmuleNetwork from "../utils/ticketmuleNetworkClass";
import { TicketContext } from "../packs/application";
import UserStore from "../actions/userStore";
import { RESOURCE_TYPES } from "../types/types";

const useGetUser = (id: number) => {
    const { state, dispatch } = useContext(TicketContext);
    const { user, aUser } = state;
    const ticketMule = new TicketmuleNetwork(user);
    const { data, isLoading } = useQuery("aUser", () =>
        ticketMule.fetchResource(id, `${RESOURCE_TYPES.USER}s`), { refetchOnMount: false,
        refetchOnWindowFocus: false, enabled: (user != null && (aUser == null || aUser.id !== id)) }
    );

    React.useEffect(() => {
        if (data && !isLoading && (!aUser || aUser.id !== id)) {
            dispatch({action_fn: UserStore.setAUser, user: data});
        }
    }, [dispatch, data, aUser]);

    if (aUser && aUser.id === id) {
        return aUser;
    } else if (data) {
        return data;
    } else {
        return null;
    }
};

export default useGetUser;