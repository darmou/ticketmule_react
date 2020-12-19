import React, { useContext } from "react";
import { useQuery } from "react-query";
import TicketmuleNetwork from "../utils/ticketmuleNetworkClass";
import { TicketContext } from "../packs/application";
import ContactStore from "../actions/contactStore";
import { RESOURCE_TYPES } from "../types/types";

const useGetContact = (id: number) => {
    const { state, dispatch } = useContext(TicketContext);
    const { user, contact } = state;
    const ticketMule = new TicketmuleNetwork(user);
    const { data, isLoading } = useQuery("ticket", () =>
        ticketMule.fetchResource(id, `${RESOURCE_TYPES.CONTACT}s`), { refetchOnMount: false,
        refetchOnWindowFocus: false, enabled: (user != null && (contact == null || contact.id !== id)) }
    );

    React.useEffect(() => {
        if (data && !isLoading && (!contact || contact.id !== id)) {
            dispatch({action_fn: ContactStore.setContact, contact: data});
        }
    }, [dispatch, user, data, contact]);

    if (contact && contact.id === id) {
        return contact;
    } else if (data) {
        return data;
    } else {
        return null;
    }
};


export default useGetContact;