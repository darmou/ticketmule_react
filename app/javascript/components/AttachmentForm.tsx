import React, { ForwardedRef, useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import useTicketmule from "../hooks/useTicketMule";
import { getAttachmentFileSize } from "../utils/displayUtils";
import SecondaryButton from "./ComponentLibrary/SecondaryButton";
import { createStandardErrorMessage, createStandardSuccessMessage, TIMEOUT } from "./ComponentLibrary/FlashMessages";
import { useMutation } from "react-query";
import { TicketContext } from "../application";
import ResourceStore from "../actions/resourceStore";
import { queryClient } from "../utils/network";

interface Props {
    toggleForm: () => void,
    addTheComment: (formData?: any | undefined) => void,
    id?: number
}

export const AttachmentForm = React.forwardRef(({toggleForm, addTheComment, id}: Props, ref: ForwardedRef<HTMLFormElement>) => {
    const ticketMule = useTicketmule();
    const { state, dispatch } = useContext(TicketContext);
    const { flashMsg } = state;

    const { register, handleSubmit, clearErrors, formState: { errors }, reset } = useForm();

    const { mutate } = useMutation(ticketMule.addRelatedTicketRecord.bind(this, state, "attachments", id),{
        onSuccess:()=>{
            // Query Invalidations
            queryClient.removeQueries('ticket', { exact: true });
        }
    });

    const onSubmit = async data => {
        console.log(data);
        //We want to submit our form
        try {
            const formData = new FormData();
            const file = data.data[0];
            formData.append("attachment[data]", file);
            // @ts-ignore
            await mutate(formData);
            // We want to add comment here
            const fileSizeKB = getAttachmentFileSize(file.size);
            data = {
                comment: `<strong>Attached</strong> ${file.name} (${fileSizeKB}KB)`,
                close_ticket: false
            };
            addTheComment(`{"comment":{"comment":"${data["comment"]}","close_ticket":${data["close_ticket"]}}}`);
            reset();
            dispatch({
                action_fn: ResourceStore.setFlashMsg,
                flashMsg: createStandardSuccessMessage("Attachment added!" )});

            setTimeout(toggleForm, (TIMEOUT * 1.1)); // Give time to view success message

        } catch (error) {
            const msg = (error.response.status === 403 ) ? 'Bad Request' : 'Error occurred';
            if (flashMsg == null) {
                dispatch({
                    action_fn: ResourceStore.setFlashMsg,
                    flashMsg: createStandardErrorMessage(msg)});
            }
        }
    };

    React.useEffect(() => {
        if (errors.comment && flashMsg == null) {
            dispatch({
                action_fn: ResourceStore.setFlashMsg,
                flashMsg: createStandardErrorMessage("Attachment field is required")});
            clearErrors("comment");
        }
        if (flashMsg) {
            setTimeout(() => {
                dispatch({
                    action_fn: ResourceStore.setFlashMsg,
                    flashMsg: null});
            }, TIMEOUT);
        }
    }, [errors, flashMsg, clearErrors, dispatch]);

    return (<StyledAttachmentForm style={{display:'none'}} ref={ref} id="add-attachment">

        <form onSubmit={handleSubmit(onSubmit)} className="new_attachment" id="new_attachment" method="post">
            <StyledEnclosingDiv>
                { flashMsg }

                <p>
                    <input {...register("data")} id="attachment_data" name="data" size={30} type="file"/>
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



