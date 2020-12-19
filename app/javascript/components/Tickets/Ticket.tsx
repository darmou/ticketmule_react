import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import useSliderToggle from "react-slide-toggle-hooks";
import { SLIDE_DURATION } from "../../utils/displayUtils";
import { SLIDE_STATES } from "../ComponentLibrary/H3ToggleStyled";
import TicketTable from "./TicketTable";
import useGetTicket from "../../hooks/useGetTicket";
import Controls from "../Controls";
import { CommentForm } from "../CommentForm";
import AttachmentList from "../AttachmentList";
import CommentList from "../CommentList";
import { TicketContext } from "../../packs/application";
import { AttachmentForm } from "../AttachmentForm";
import { queryCache, useMutation } from "react-query";
import useTicketmule from "../../hooks/useTicketMule";
import { RESOURCE_TYPES } from "../../types/types";

const Ticket = React.memo(() => {
    const { state } = useContext(TicketContext);
    const { slug } = useParams();
    const ticket = useGetTicket(parseInt(slug));
    const ticketMule = useTicketmule();

    const getSliderToggle = React.useCallback(useSliderToggle,[]);
    const { expandableRef, toggle } = getSliderToggle(
        { initialState: SLIDE_STATES.COLLAPSED, duration: SLIDE_DURATION });

    const attachmentToggle = getSliderToggle(
        {
            initialState: SLIDE_STATES.COLLAPSED, duration: SLIDE_DURATION }
    );

    const [addTheComment] = useMutation(
        ticketMule.addRelatedTicketRecord.bind(this, state, "comments"),
        {
            onSuccess: async () => {
                // Query Invalidations
                await queryCache.invalidateQueries('ticket');
            },
        }
    );

    return(<>
        <h2>Ticket #{slug}</h2>

        {(state.ticket) &&
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
            <AttachmentList  state={state} attachments={ticket.attachments}/>
        }
        { (ticket && true && ticket.comments != null && ticket.comments.length > 0) &&
            <CommentList state={state} comments={ticket.comments}/>
        }

    </>);
});

export default Ticket;

