import React, {useContext} from "react";
import styled from "styled-components";
import {Link, useNavigate} from "react-router-dom";
import {queryCache, useMutation} from "react-query";
import EditTicketIcon from "../images/edit-ticket.png";
import PDFIcon from "../images/document-pdf.png";
import AddAlertIcon from "../images/add-alert.png";
import AddCommentIcon from "../images/add-comment.png";
import AddAttachmentIcon from "../images/add-attachment.png";
import DeleteIcon from "../images/delete.png";
import EditContactIcon from "../images/edit-contact.png";
import EditUserIcon from "../images/edit-user.png";
import EnableContactIcon from "../images/accept.png";
import DisableContactIcon from "../images/disable.png";
import BackArrowIcon from "../images/back-arrow.png";
import TicketmuleNetwork from "../utils/ticketmuleNetworkClass";
import {deleteAlert} from "../utils/displayUtils";
import TicketStore from "../actions/ticketStore";
import ContactStore from "../actions/contactStore";
import {RESOURCE_TYPES} from "../types/types";
import {TicketContext} from "../packs/application";
import UserStore from "../actions/userStore";
import useDeleteAlert from "../hooks/useDeleteAlert";
import {createStandardSuccessMessage} from "./ComponentLibrary/FlashMessages";


/*
Edit | Pdf | Add Alert | Add ResourceItem | Add Attachment | Delete | BackTicket #435

 */
interface Props {
    resourceType: RESOURCE_TYPES,
    setShowCommentForm?: () => void,
    resource: any,
    setShowAttachmentForm?: () => void
}

const Controls = ({setShowCommentForm, resource, resourceType, setShowAttachmentForm} : Props) => {
    const { state, dispatch } = useContext(TicketContext);
    const { user } = state;
    const { alert } = (resourceType === RESOURCE_TYPES.TICKET && resource) ? resource : { alert: null };
    const navigate = useNavigate();
    const { deleteTheAlert } = useDeleteAlert();
    const ticketMule = new TicketmuleNetwork(user);

    const [toggleEnableContact] = useMutation(
        ticketMule.toggleEnableContact.bind(this, state),
        {
            onSuccess: async (contact) => {
                dispatch({action_fn: ContactStore.setContact, contact});
                // Query Invalidations
                await queryCache.invalidateQueries('contact');
            },
        }
    );

    const [deleteTheTicket] = useMutation(
        ticketMule.deleteResource.bind(this, state, RESOURCE_TYPES.TICKET),
        {
            onSuccess: async () => {
                // Query Invalidations
                await queryCache.invalidateQueries('tickets');
            },
        }
    );

    const [deleteTheUser] = useMutation(
        ticketMule.deleteResource.bind(this, state, RESOURCE_TYPES.USER),
        {
            onSuccess: async () => {
                // Query Invalidations
                await queryCache.invalidateQueries('users');
            },
        }
    );

    const [addTheAlert] = useMutation(
        ticketMule.addRelatedTicketRecord.bind(this, state, "alerts"),
        {
            onSuccess: async () => {
                dispatch({
                    action_fn: TicketStore.setFlashMsg,
                    flashMsg: createStandardSuccessMessage("Your alert was added and you will now receive an email any time this ticket is updated!")});
                // Query Invalidations
                await queryCache.invalidateQueries(RESOURCE_TYPES.TICKET);
            },
        }
    );

    const addAlert = async () => {
        if (window.confirm(`Really add alert for ticket #${resource.id}?`)) {
            //useMutation to post to alerts endpoint!
            // @ts-ignore
            await addTheAlert('{"alert":{}}');
        }
    };

    const removeAlert = async (alert) => {
        await deleteAlert(alert, deleteTheAlert);
    };

    const toggleContact = async () => {
        const operation = (resource.is_enabled) ? 'disable' : 'enable';
        if (window.confirm(`Really ${operation} contact ${resource.last_name}, ${resource.first_name}?`)) {
            //useMutation to delete this alert
            await toggleEnableContact(resource.id);
        }
    };

    const deleteTicket = async () => {
        if (window.confirm(`Really delete ticket #${resource.id} and all its associated data?`)) {
            //useMutation to use delete method on ticket
            await deleteTheTicket();
            dispatch({action_fn: TicketStore.deleteTicket, id: resource.id});
            navigate("/tickets");
        }
    };

    const deleteUser = async () => {
        if (window.confirm(`Really delete user #${resource.id} (${resource.full_name})?`)) {
            //useMutation to use delete method on ticket
            await deleteTheUser();
            dispatch({action_fn: UserStore.deleteUser, id: resource.id});
            navigate("/users");
        }
    };

    const getPdf = async id => {
        const pdf = await ticketMule.fetchTicket(resource.id, true);
        if (pdf) {
            const a = document
                .createElement("a");
            // eslint-disable-next-line no-undef
            const b64encoded = btoa([].reduce.call(new Uint8Array(pdf),
                (p,c) => p + String.fromCharCode(c),''));
            a.href = "data:application/pdf;base64,"+ b64encoded;
            a.download = `ticket_${resource.id}.pdf`;
            a.click();
        }
    };

    if (resource == null) {
        return null;
    }

    //node Add alert becomes remove alert if there is already an alert on the ticket
    const alertKey = (alert == null) ? "Add Alert" : "Remove Alert";
    const enableKey = (state.contact && state.contact.is_enabled) ? "Disable" : "Enable";
    const controlList =  ((resourceType) => {
        switch (resourceType) {
            case RESOURCE_TYPES.TICKET:
                return {
                    "Edit": {link: `/tickets/${state.ticket.id}/edit`, icon: EditTicketIcon},
                    "Pdf": {link: () => getPdf(state.ticket.id), icon: PDFIcon},
                    [alertKey]: {link: () => (alert != null) ? removeAlert(alert) : addAlert(), icon: AddAlertIcon},
                    "Add Comment": {link: () => setShowCommentForm(), icon: AddCommentIcon},
                    "Add Attachment": {link: () => setShowAttachmentForm(), icon: AddAttachmentIcon},
                    "Delete": {link: () => deleteTicket(), icon: DeleteIcon},
                    "Back": {link: "/tickets/", icon: BackArrowIcon}
                };
            case RESOURCE_TYPES.CONTACT:
                return {
                    "Edit": {link: `/contacts/${resource.id}/edit`, icon: EditContactIcon},
                    [enableKey]: {
                        link: () => toggleContact(),
                        icon: (resource.is_enabled) ? DisableContactIcon : EnableContactIcon
                    },
                    "Back": {link: "/contacts/", icon: BackArrowIcon}
                };
            case RESOURCE_TYPES.USER:
                return {
                    "Edit": { link: `/users/${resource.id}/edit`, icon: EditUserIcon },
                    "Delete": { link: () => deleteUser(), icon: DeleteIcon },
                    "Back": { link: "/users/", icon: BackArrowIcon }
                };
        }
    })(resourceType);

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

export default Controls;