import { useMutation } from "react-query";
import useTicketMule from "./useTicketMule";
import React, { useContext } from "react";
import { TicketContext } from "../packs/application";
import { SuccessNotificationStyled } from "../components/ComponentLibrary/FlashMessages";
import ResourceStore from "../actions/resourceStore";
import {RESOURCE_TYPES, Ticket} from "../types/types";
import EnableIcon from "../images/accept.png";
import { queryClient } from "../utils/network";

interface Response {
    ticket_id: number
}

const useDeleteAlert = () => {
    const ticketMule = useTicketMule();
    const { state, dispatch } = useContext(TicketContext);
    const {mutate: deleteTheAlert} = useMutation(
        ticketMule.deleteRelatedTicketRecord.bind(this, state, "alerts", null),
        {
            onSuccess: async (ticket: Ticket) => {
                dispatch({
                    action_fn: ResourceStore.setFlashMsg,
                    flashMsg: <SuccessNotificationStyled>
                        <img src={`${EnableIcon}`} /> The alert for ticket #{ticket.id} was removed!
                    </SuccessNotificationStyled>});
                dispatch({
                    action_fn: ResourceStore.setResource,
                    resource: ticket,
                    resourceType: RESOURCE_TYPES.TICKET
                });
                // Query Invalidations
                queryClient.removeQueries("ticket", { exact: true });
                queryClient.removeQueries("aUser", { exact: true });
            },
        }
    );

    return { deleteTheAlert };
};

export default useDeleteAlert;