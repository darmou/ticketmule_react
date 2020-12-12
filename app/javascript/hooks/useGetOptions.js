import React, { useContext } from "react";
import { useQuery } from "react-query";
import PropTypes from "prop-types";
import TicketmuleNetwork from "../utils/ticketmuleNetworkClass";
import TicketStore from "../actions/ticketStore";
import { TicketContext } from "../packs/application";

const useGetOptions = (shouldFetchPeoeple) => {
    const { state, dispatch } = useContext(TicketContext);
    const { user, options } = state;
    const ticketMule = new TicketmuleNetwork(user);

    const { data, isLoading } = useQuery("options", () =>
        ticketMule.fetchOptions(shouldFetchPeoeple), { refetchOnMount: false,
        refetchOnWindowFocus: false,
        enabled: (user != null && options == null) }
    );


    React.useEffect(() => {
        if (data && !isLoading && !options) {
            dispatch({action_fn: TicketStore.setOptions, options: data});
        }
    }, [dispatch, data, options]);

    if (options) {
        return { options, isLoading };
    } else if (data) {
        return { options: data, isLoading };
    } else {
        return { options: {}, isLoading };
    }
};

useGetOptions.propTypes = {
    type: PropTypes.string
};

export default useGetOptions;
