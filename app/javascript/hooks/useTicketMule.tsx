import React, { useContext } from "react";
import { TicketContext } from "../application";
import TicketmuleNetwork from "../utils/ticketmuleNetworkClass";


function useTicketMule() {
    const { state } = useContext(TicketContext);

    return new TicketmuleNetwork(state.user);

}

export default useTicketMule;