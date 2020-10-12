import React, {useContext} from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import useSliderToggle from "react-slide-toggle-hooks";
import { SLIDE_DURATION } from "./TicketBoard";
import { SLIDE_STATES } from "./TableSection";
import { PropTypes } from "prop-types";
import TicketTable from "./TicketTable";
import useGetTicket from "../hooks/use_get_ticket";
import Controls from "./Controls";
import { CommentForm } from "./CommentForm";
import CommentList from "./CommentList";
import { TicketsStyled } from "./Tickets";
import { TicketContext } from "../packs/application";
import { AttachmentForm } from "./AttachmentForm";

const Ticket = React.memo(() => {
    const { state } = useContext(TicketContext);
    const { slug } = useParams();
    const ticket = useGetTicket(slug);
    const [showAlertForm, setShowAlertForm] = React.useState(false);

    const getSliderToggle = React.useCallback(useSliderToggle,[]);
    const { expandableRef, toggle } = getSliderToggle(
        {initialState: SLIDE_STATES.COLLAPSED, duration: SLIDE_DURATION});

    const attachmentToggle = getSliderToggle(
        {
            initialState: SLIDE_STATES.COLLAPSED, duration: SLIDE_DURATION }
    );

    return(<TicketStyled>
        <h2>Ticket #{slug}</h2>

        <Controls id={slug} setShowCommentForm={toggle} setShowAlertForm={setShowAlertForm} setShowAttachmentForm={attachmentToggle.toggle}/>

        {(state.ticket) &&
            <TicketTable ticket={state.ticket}/>
        }

        <CommentForm ref={expandableRef} state={state} toggleForm={toggle} id={slug}/>
        <AttachmentForm ref={attachmentToggle.expandableRef} state={state} toggleForm={attachmentToggle.toggle} id={slug}/>

        { (ticket && ticket != null && ticket.comments != null && ticket.comments.length > 0) &&
            <CommentList state={state} comments={ticket.comments}/>
        }


        {
            /*
                 <AlertForm isShown={showAlertForm}/>
                 <AttachmentForm isShown={showAttachmentForm}/>
             */
        }

    </TicketStyled>);
});

Ticket.propTypes = {
    context: PropTypes.object
};

export default Ticket;

export const TicketStyled = styled(TicketsStyled)`
    h2 { 
        float: left;
    }
    
    table {
        border-top: 1px solid #ececec;
     }
    tr:nth-last-child(2) {
        border-bottom: none;
    }
    tr {
        border-bottom: 1px solid #ececec;
        height: 25px;
    }
    a:hover {
        color: #90af4c;
    }
`;