import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import useTicketmule from "../hooks/useTicketMule";
import { getAttachmentFileSize } from "../utils/displayUtils";
import SecondaryButton from "./ComponentLibrary/SecondaryButton";
import { createStandardSuccessMessage, createStandardErrorMessage, TIMEOUT } from "./ComponentLibrary/FlashMessages";
import { queryCache, useMutation } from "react-query";
import { TicketContext } from "../packs/application";
import TicketStore from "../actions/ticketStore";


export const AttachmentForm = React.forwardRef((props, ref) => {
    const ticketMule = useTicketmule();
    const { toggleForm, addTheComment } = props;
    const { state, dispatch } = useContext(TicketContext);
    const { flashMsg } = state;
    const { register, handleSubmit, clearErrors, errors, reset } = useForm();
    const [addTheAttachment] = useMutation(
        ticketMule.addRelatedTicketRecord.bind(this, state, "attachments"),
        {
            onSuccess: async () => {
                // Query Invalidations
                await queryCache.invalidateQueries('ticket');
            },
        }
    );

    const onSubmit = async data => {
        console.log(data);
        //We want to submit our form
        try {
            const formData = new FormData();
            const file = data.data[0];
            formData.append("attachment[data]", file);
            await addTheAttachment(formData);
            // We want to add comment here
            const fileSizeKB = getAttachmentFileSize(file.size);
            data = {
                comment: `<strong>Attached</strong> ${file.name} (${fileSizeKB}KB)`,
                close_ticket: false
            };
            addTheComment(`{"comment":{"comment":"${data["comment"]}","close_ticket":${data["close_ticket"]}}}`);
            reset();
            dispatch({
                action_fn: TicketStore.setFlashMsg,
                flashMsg: createStandardSuccessMessage("Attachment added!" )});

            setTimeout(toggleForm, (TIMEOUT * 1.1)); // Give time to view success message

        } catch (error) {
            const msg = (error.response.status === 403 ) ? 'Bad Request' : 'Error occurred';
            if (flashMsg == null) {
                dispatch({
                    action_fn: TicketStore.setFlashMsg,
                    flashMsg: createStandardErrorMessage(msg)});
            }
        }
    };

    React.useEffect(() => {
        if (errors.comment && flashMsg == null) {
            dispatch({
                action_fn: TicketStore.setFlashMsg,
                flashMsg: createStandardErrorMessage("Attachment field is required")});
            clearErrors("comment");
        }
        if (flashMsg) {
            setTimeout(() => {
                dispatch({
                    action_fn: TicketStore.setFlashMsg,
                    flashMsg: null});
            }, TIMEOUT);
        }
    }, [errors, flashMsg, clearErrors, dispatch]);

    return (<StyledAttachmentForm style={{display:'none'}} ref={ref} id="add-attachment">

        <form onSubmit={handleSubmit(onSubmit)} className="new_attachment" id="new_attachment" method="post">
            <StyledEnclosingDiv>
                { flashMsg }

                <p>
                    <input ref={register} id="attachment_data" name="data" size="30" type="file"/>
                        <span id="attachment_limit">Limit 10 megabytes</span>
                </p>

            </StyledEnclosingDiv>

            <p>
                <SecondaryButton className="button" id="attachment_submit" name="commit" type="submit"
                >Add Attachment</SecondaryButton>&nbsp;&nbsp;
                <Link to={'#'} onClick={toggleForm}>Cancel</Link>
            </p>
        </form>
    </StyledAttachmentForm>);
});

const StyledEnclosingDiv = styled.div`
    width: 490px;
`;

const StyledAttachmentForm = styled.div`
    input[type=submit] {
        margin-right: 13px;
    }
`;

AttachmentForm.propTypes = {
    addTheComment: PropTypes.func,
    toggleForm: PropTypes.func,
    state: PropTypes.object,
    id: PropTypes.string
};


