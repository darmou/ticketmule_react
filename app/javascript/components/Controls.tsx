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
import { deleteAlert } from "../utils/displayUtils";
import ResourceStore from "../actions/resourceStore";
import {RESOURCE_TYPES, Ticket} from "../types/types";
import {TicketContext} from "../packs/application";
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
    const alert = (resourceType === RESOURCE_TYPES.TICKET && resource) ? resource.alert : { alert: null };
    const navigate = useNavigate();
    const { deleteTheAlert } = useDeleteAlert();
    const ticketMule = new TicketmuleNetwork(user);

    const [toggleEnableContact] = useMutation(
        ticketMule.toggleEnableContact.bind(this, state),
        {
            onSuccess: async (contact) => {
                dispatch({action_fn: ResourceStore.setResource, resource: contact, resourceType});
                // Query Invalidations
                await queryCache.invalidateQueries(`${resourceType}`);
            },
        }
    );

    const [deleteTheResource] = useMutation(
        ticketMule.deleteResource.bind(this, state, resourceType, resource.id),
        {
            onSuccess: async () => {
                // Query Invalidations
                // If after deletion our page data is out of date we want to update the page data
                // So we don't try to pull a current page that does not exist.
                const resourceCount = state[`${resourceType}PageInfo`].resourceCount;
                const perPage = state[`${resourceType}PageInfo`].perPage;
                const lastPage = state[`${resourceType}PageInfo`].lastPage;
                const calculatedPages = Math.ceil((resourceCount -1) / perPage);
                const currentPage = (state[`${resourceType}PageInfo`].currentPage < calculatedPages) ?
                    state[`${resourceType}PageInfo`].currentPage : calculatedPages;
                if (calculatedPages < lastPage) {
                    const pageData = {
                        pagy: {
                            page: currentPage,
                            count: resourceCount -1,
                            last: calculatedPages
                        },
                        data: state[`${resourceType}s`]
                    };
                    dispatch({action_fn: ResourceStore.setPageData, resourceType, pageData});
                }
                await queryCache.invalidateQueries(`${resourceType}s`);
            },
        }
    );

    const [addTheAlert] = useMutation(
        ticketMule.addRelatedTicketRecord.bind(this, state, "alerts", resource.id),
        {
            onSuccess: async (ticket: Ticket) => {
                dispatch({
                    action_fn: ResourceStore.setFlashMsg,
                    flashMsg: createStandardSuccessMessage("Your alert was added and you will now receive an email any time this ticket is updated!")});
                // Query Invalidations

                dispatch({
                    action_fn: ResourceStore.setResource,
                    resource: ticket,
                    resourceType: RESOURCE_TYPES.TICKET});

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

    const deleteResource = async () => {
        const text = (resourceType === RESOURCE_TYPES.USER) ? `(${resource.full_name})` : "and all its associated data";
        if (window.confirm(`Really delete ${resourceType} #${resource.id} ${text}?`)) {
            //useMutation to use delete method on ticket
            await deleteTheResource();
            dispatch({action_fn: ResourceStore.deleteResource, resourceType, id: resource.id});
            navigate(`/${resourceType}s`);
        }
    };

    const getPdf = async () => {
        const pdf = await ticketMule.fetchTicket(resource.id, true);
        if (pdf) {
            const a = document
                .createElement("a");
            // eslint-disable-next-line no-undef
            const b64encoded = btoa([].reduce.call(new Uint8Array(pdf),
                (p,c) => p + String.fromCharCode(c),''));
            a.href = "data:application/pdf;base64,"+ b64encoded;
            // download attribute to specify that the target will be downloaded when a user clicks on the hyperlink.
            // specifing a value will change the name of the downloaded file otherwise will keep origonal name.
            a.download = `ticket_${resource.id}.pdf`;
            a.click();
        }
    };

    if (resource == null) {
        return null;
    }

    //node Add alert becomes remove alert if there is already an alert on the ticket
    const alertKey = (alert == null) ? "Add Alert" : "Remove Alert";
    const enableKey = (resource && resource.is_enabled) ? "Disable" : "Enable";
    const controlList =  ((resourceType) => {
        switch (resourceType) {
            case RESOURCE_TYPES.TICKET:
                return {
                    "Edit": {link: `/tickets/${resource.id}/edit`, icon: EditTicketIcon},
                    "Pdf": {link: () => getPdf(), icon: PDFIcon},
                    [alertKey]: {link: () => (alert != null) ? removeAlert(alert) : addAlert(), icon: AddAlertIcon},
                    "Add Comment": {link: () => setShowCommentForm(), icon: AddCommentIcon},
                    "Add Attachment": {link: () => setShowAttachmentForm(), icon: AddAttachmentIcon},
                    "Delete": {link: () => deleteResource(), icon: DeleteIcon},
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
                    "Delete": { link: () => deleteResource(), icon: DeleteIcon },
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