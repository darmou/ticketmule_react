import React, { useContext } from "react";
import { useQuery } from "react-query";
import PropTypes from "prop-types";
import TicketmuleNetwork from "../utils/ticketmuleNetworkClass";
import { TicketContext } from "../application";

const useGetOptions = (shouldFetchPeoeple : boolean) => {
    const { state } = useContext(TicketContext);
    const { user, options } = state;
    const ticketMule = new TicketmuleNetwork(user);

    const { data, isLoading, refetch } = useQuery("options", () =>
        ticketMule.fetchOptions(shouldFetchPeoeple), { refetchOnMount: false,
        refetchOnWindowFocus: false,
        enabled: (user != null && options == null) }
    );

    if (data) {
        return { options: data, isLoading, refetch };
    } else {
        return { options: {}, isLoading, refetch };
    }
};

useGetOptions.propTypes = {
    type: PropTypes.string
};

export default useGetOptions;
