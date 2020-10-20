import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import { useMutation, queryCache } from "react-query";
import EditTicketIcon from "../images/edit-ticket.png";
import PDFIcon from "../images/document-pdf.png";
import AddAlertIcon from "../images/add-alert.png";
import AddCommentIcon from "../images/add-comment.png";
import AddAttachmentIcon from "../images/add-attachment.png";
import DeleteIcon from "../images/delete.png";
import BackArrowIcon from "../images/back-arrow.png";
import TicketmuleNetwork from "../utils/ticketmuleNetworkClass";
import TicketStore, { ticketsTypes } from "../actions/ticketStore";


/*
Edit | Pdf | Add Alert | Add Comment | Add Attachment | Delete | BackTicket #435

 */
const Controls = ({alert, dispatch, state, setShowCommentForm, setShowAttachmentForm}) => {
    const { user, ticket } = state;
    const navigate = useNavigate();
    const ticketMule = new TicketmuleNetwork(user);

    const [deleteTheAlert] = useMutation(
        ticketMule.deleteRelatedTicketRecord.bind(this, state, "alerts"),
        {
            onSuccess: async () => {
                // Query Invalidations
                await queryCache.invalidateQueries('ticket');
            },
        }
    );

    const [deleteTheTicket] = useMutation(
        ticketMule.deleteTicket.bind(this, state),
        {
            onSuccess: async () => {
                // Query Invalidations
                await queryCache.invalidateQueries('tickets');
            },
        }
    );

    const [addTheAlert] = useMutation(
        ticketMule.addRelatedTicketRecord.bind(this, state, "alerts"),
        {
            onSuccess: async () => {
                // Query Invalidations
                await queryCache.invalidateQueries('ticket');
            },
        }
    );

    const addAlert = async () => {
        if (window.confirm(`Really add alert for ticket #${ticket.id}?`)) {
            //useMutation to post to alerts endpoint!
            await addTheAlert('{"alert":{}}');
        }
    };

    const removeAlert = async () => {
        if (window.confirm(`Really remove alert for ticket #${ticket.id}?`)) {
            //useMutation to delete this alert
            await deleteTheAlert(alert.id);
        }
    };

    const deleteTicket = async () => {
        if (window.confirm(`Really delete ticket #${ticket.id} and all its associated data?`)) {
            //useMutation to use delete method on ticket
            const ticketId = ticket.id;
            await deleteTheTicket();
            dispatch({action_fn: TicketStore.deleteTicket, id: ticketId});
            navigate("/tickets");
        }
    };

    const getPdf = async () => {
        const pdf = await ticketMule.fetchTicket(ticket.id, true);
        if (pdf) {
            const a = document
                .createElement("a");
            // eslint-disable-next-line no-undef
            const b64encoded = btoa([].reduce.call(new Uint8Array(pdf),
                (p,c) => p + String.fromCharCode(c),''));
            a.href = "data:application/pdf;base64,"+ b64encoded;
            a.download = `ticket_${ticket.id}.pdf`;
            a.click();
        }
    };

    if (!state.ticket) {
        return null;
    }

    //node Add alert becomes remove alert if there is already an alert on the ticket
    const alertKey = (alert == null) ? "Add Alert" : "Remove Alert";
    const controlList = {
        "Edit": { link: `/tickets/${state.ticket.id}/edit`, icon: EditTicketIcon },
        "Pdf": { link: () => getPdf(state.ticket.id), icon: PDFIcon },
        [alertKey]: { link: () => (alert != null) ? removeAlert() : addAlert(), icon: AddAlertIcon },
        "Add Comment": { link: () => setShowCommentForm(), icon: AddCommentIcon },
        "Add Attachment": { link: () => setShowAttachmentForm(), icon: AddAttachmentIcon },
        "Delete": { link: () => deleteTicket(), icon: DeleteIcon },
        "Back": { link: "/tickets/", icon: BackArrowIcon }
    };

    const controls = Object.keys(controlList).map((controlLabel, idx) => {
        const bar = (controlLabel === "Back") ? "" : "|";
        return <span key={`conspn-${idx}`}>
           <StyledLink
               icon={controlList[controlLabel].icon}
               onClick={(typeof controlList[controlLabel].link === "function") ? controlList[controlLabel].link : null}
               to={(typeof controlList[controlLabel].link === "function") ? "" : `${controlList[controlLabel].link}`}>
           {controlLabel}</StyledLink>
            {bar}</span>;
    });


    return (
        <ControlsStyled>
            {controls}
        </ControlsStyled>
    );
};

const StyledLink = styled(Link)`
    background: transparent url(${({icon}) => icon}) no-repeat 0 1px;
    padding: 2px 4px 4px 23px;
`;

const ControlsStyled = styled.div`
    padding: 4px;
    background: #f4f4ee;
    color: #aaa;
    border: 1px solid #ddd;
    border-radius: 5px;
    float: right;
    -moz-border-radius: 5px;
    -webkit-border-radius: 5px;
    a.background {
        transparent url(../images/edit-ticket.png) no-repeat 0 1px;
    }
`;

Controls.propTypes = {
    dispatch: PropTypes.func,
    state: PropTypes.object,
    alert: PropTypes.object,
    setShowCommentForm: PropTypes.func,
    setShowAttachmentForm: PropTypes.func
};


export default Controls;