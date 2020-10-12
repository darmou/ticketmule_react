import React, {useContext} from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import EditTicketIcon from "../images/edit-ticket.png";
import PDFIcon from "../images/document-pdf.png";
import AddAlertIcon from "../images/add-alert.png";
import AddCommentIcon from "../images/add-comment.png";
import AddAttachmentIcon from "../images/add-attachment.png";
import DeleteIcon from "../images/delete.png";
import BackArrowIcon from "../images/back-arrow.png";
import { TicketContext } from "../packs/application";
import TicketmuleNetwork from "../utils/ticketmule_network_class";

/*
Edit | Pdf | Add Alert | Add Comment | Add Attachment | Delete | BackTicket #435

 */
const Controls = ({id, setShowCommentForm, setShowAlertForm, setShowAttachmentForm}) => {
    const { state } = useContext(TicketContext);
    const navigation = useNavigate();
    const mutate = useMutation();
    const ticketMule = new TicketmuleNetwork(state.user);

    const addAlert = (id) => {
        if (window.confirm("Really add alert?")) {
            //useMutation to post to alerts endpoint!
        }
    };

    const deleteTicket = (id) => {
        if (window.confirm(`Really delete ticket #${id} and all its associated data?`)) {
            //useMutation to use delete method on ticket

        }
    };

    const getPdf = async (id) => {
        const pdf = await ticketMule.fetchTicket(id, true);
        if (pdf) {
            const a = document.createElement("a");
            // eslint-disable-next-line no-undef
            const b64encoded = btoa([].reduce.call(new Uint8Array(pdf),
                (p,c) => p + String.fromCharCode(c),''));
            a.href = "data:application/pdf;base64,"+ b64encoded;
            a.download = `ticket_${id}.pdf`;
            a.click();
        }
    };

    //node Add alert becomes remove alert if there is already an alert on the ticket
    const controlList = {
        "Edit": { link: `/tickets/${id}/edit`, icon: EditTicketIcon },
        "Pdf": { link: () => getPdf(id), icon: PDFIcon },
        "Add Alert": { link: () => addAlert(id), icon: AddAlertIcon },
        "Add Comment": { link: () => setShowCommentForm(), icon: AddCommentIcon },
        "Add Attachment": { link: () => setShowAttachmentForm(), icon: AddAttachmentIcon },
        "Delete": { link: () => deleteTicket(id), icon: DeleteIcon },
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
    id: PropTypes.string,
    setShowAlertForm: PropTypes.func,
    setShowCommentForm: PropTypes.func,
    setShowAttachmentForm: PropTypes.func
};


export default Controls;