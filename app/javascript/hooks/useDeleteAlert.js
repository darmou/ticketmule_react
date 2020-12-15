import { queryCache, useMutation } from "react-query";
import useTicketMule from "./useTicketMule";
import React, { useContext } from "react";
import { TicketContext } from "../packs/application";
import { SuccessNotificationStyled } from "../components/ComponentLibrary/FlashMessages";
import TicketStore from "../actions/ticketStore";
import EnableIcon from "../images/accept.png";

const useDeleteAlert = () => {
    const ticketMule = useTicketMule();
    const { state, dispatch } = useContext(TicketContext);
    const [deleteTheAlert] = useMutation(
        ticketMule.deleteRelatedTicketRecord.bind(this, state, "alerts", null),
        {
            onSuccess: async (response) => {
                dispatch({
                    action_fn: TicketStore.setFlashMsg,
                    flashMsg: <SuccessNotificationStyled>
                        <img src={`${EnableIcon}`} /> The alert for ticket #{response.ticket_id} was removed!
                    </SuccessNotificationStyled>});
                // Query Invalidations
                await queryCache.invalidateQueries("ticket");
                await queryCache.invalidateQueries("aUser");
            },
        }
    );

    return { deleteTheAlert };
};

export default useDeleteAlert;