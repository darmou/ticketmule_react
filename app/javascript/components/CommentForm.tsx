import React, {ForwardedRef, useContext} from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import ResourceStore from "../actions/resourceStore";
import SecondaryButton from "./ComponentLibrary/SecondaryButton";
import {
    TIMEOUT,
    createStandardSuccessMessage, createStandardErrorMessage
} from "./ComponentLibrary/FlashMessages";
import { TicketContext } from "../packs/application";

interface Props {
    toggleForm: () => void,
    addTheComment: (formData?: any | undefined) => void,
    id?: number
}

// eslint-disable-next-line react/display-name
export const CommentForm = React.forwardRef((props: Props, ref :ForwardedRef<HTMLFormElement>) => {
    const { toggleForm, addTheComment } = props;
    const { dispatch, state } = useContext(TicketContext);
    const { flashMsg } = state;
    const { register, handleSubmit, clearErrors, formState: { errors }, reset } = useForm();

    const onSubmit = async data => {
        //We want to submit our form
        try {
            await addTheComment(`{"comment":{"comment":"${data["comment"]}","close_ticket":${data["close_ticket"]}}}`);
            reset();
            dispatch({
                action_fn: ResourceStore.setFlashMsg,
                flashMsg: createStandardSuccessMessage("Comment added!")});
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
                flashMsg: createStandardErrorMessage("Comment field is required")});
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

    return (<StyledCommentForm style={{display:'none'}} ref={ref} id="add-comment">

        <form onSubmit={handleSubmit(onSubmit)} className="new_comment" id="new_comment" method="post">
            <StyledEnclosingDiv>
                { flashMsg }
                <StyledTextArea className="textarea" cols="70" {...register("comment", {required: true})}
                                id="comment_comment"
                                name="comment"
                                rows="6"
                              spellCheck="false"></StyledTextArea>


            </StyledEnclosingDiv>
            <p id="close-check">
                <input id="close_ticket" name="close_ticket" {...register("close_ticket")}  type="checkbox"/>
                <label htmlFor="close_ticket">Close ticket with this comment</label>
            </p>
            <p>
                <SecondaryButton className="button" id="comment_submit" name="commit" type="submit"
                       >Add Comment</SecondaryButton>
                <Link to={'#'} onClick={toggleForm}>Cancel</Link>
            </p>
        </form>
    </StyledCommentForm>);
});

const StyledEnclosingDiv = styled.div`
    width: 490px;
`;

const StyledCommentForm = styled.div`
    input[type=submit] {
        margin-right: 13px;
    }
`;

const StyledTextArea = styled.textarea`
    padding: 4px;
    background: #fff;
    width: 480px;
    border: 1px solid #ccc;
    font: 12px Verdana,sans-serif;
    -moz-border-radius: 3px;
    -webkit-border-radius: 3px;
`;


