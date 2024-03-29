import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import useSliderToggle from "react-slide-toggle-hooks";
import { SLIDE_DURATION } from "../../utils/displayUtils";
import { SLIDE_STATES } from "../ComponentLibrary/H3ToggleStyled";
import TicketTable from "./TicketTable";
import useGetResource from "../../hooks/useGetResource";
import Controls from "../Controls";
import { CommentForm } from "../CommentForm";
import AttachmentList from "../AttachmentList";
import CommentList from "../CommentList";
import { TicketContext } from "../../application";
import { AttachmentForm } from "../AttachmentForm";
import { useMutation } from "react-query";
import useTicketmule from "../../hooks/useTicketMule";
import { RESOURCE_TYPES } from "../../types/types";
import { queryClient } from "../../utils/network";

const Ticket = React.memo(() => {
    const { state } = useContext(TicketContext);
    const { slug } = useParams();
    const ticket = useGetResource(parseInt(slug), RESOURCE_TYPES.TICKET);
    const ticketMule = useTicketmule();

    const getSliderToggle = React.useCallback(useSliderToggle,[]);
    const { expandableRef, toggle } = getSliderToggle({
            initialState: SLIDE_STATES.COLLAPSED, duration: SLIDE_DURATION });

    const attachmentToggle = getSliderToggle({
            initialState: SLIDE_STATES.COLLAPSED, duration: SLIDE_DURATION }
    );

    const {mutate: addTheComment} = useMutation(
        ticketMule.addRelatedTicketRecord.bind(this, state, "comments", slug),
        {
            onSuccess: async () => {
                // Query Invalidations
                queryClient.removeQueries("ticket", { exact: true });
            },
        }
    );

    return(<>
        <h2>Ticket #{slug}</h2>

        {(ticket) &&
            <>
                <Controls setShowCommentForm={toggle}
                          resource={ticket}
                          resourceType={RESOURCE_TYPES.TICKET}
                          setShowAttachmentForm={attachmentToggle.toggle}/>
                <TicketTable ticket={ticket}/>
            </>
        }

        <CommentForm ref={expandableRef} addTheComment={addTheComment} toggleForm={toggle} id={parseInt(slug)}/>
        <AttachmentForm ref={attachmentToggle.expandableRef} addTheComment={addTheComment}
                        toggleForm={attachmentToggle.toggle} id={parseInt(slug)}/>

        { (ticket && true && ticket.attachments != null && ticket.attachments.length > 0) &&
            <AttachmentList  state={state} ticket={ticket} />
        }
        { (ticket && true && ticket.comments != null && ticket.comments.length > 0) &&
            <CommentList state={state} ticket={ticket} />
        }

    </>);
});

export default Ticket;

