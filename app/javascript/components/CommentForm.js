import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import useTicketmule from "../hooks/use_ticketmule";
import {
    SecondaryButtonStyled,
    ErrorNotificationStyled,
    TIMEOUT,
    SuccessNotificationStyled
} from "./Login";
import { queryCache, useMutation } from "react-query";


export const CommentForm = React.forwardRef((props, ref) => {
    const ticketMule = useTicketmule();
    const { toggleForm } = props;
    const [ flashMsg, setFlashMsg ] = React.useState(null);
    const { register, handleSubmit, clearErrors, errors, reset } = useForm();
    const [addTheComment] = useMutation(
        ticketMule.addComment.bind(this, props.state),
        {
            onSuccess: async () => {
                // Query Invalidations
                await queryCache.invalidateQueries('ticket');
            },
        }
    );

    const onSubmit = async data => {
        //We want to submit our form
        try {
            await addTheComment(data);
            reset();
            setFlashMsg(<SuccessNotificationStyled> Comment added! </SuccessNotificationStyled>);
            setTimeout(toggleForm, (TIMEOUT * 1.1)); // Give time to view success message

        } catch (error) {
            const msg = (error.response.status === 403 ) ? 'Bad Request' : 'Error occurred';
            if (flashMsg == null) {
                setFlashMsg(<ErrorNotificationStyled> {msg} </ErrorNotificationStyled>);
            }
        }

    };

    React.useEffect(() => {
        if (errors.comment && flashMsg == null) {
            setFlashMsg(<ErrorNotificationStyled> Comment field is required </ErrorNotificationStyled>);
            clearErrors("comment");
        }
        if (flashMsg) {
            setTimeout(() => {
                setFlashMsg(null);
            }, TIMEOUT);
        }
    }, [errors, flashMsg, clearErrors, setFlashMsg]);

    return (<StyledCommentForm style={{display:'none'}} ref={ref} id="add-comment">

        <form onSubmit={handleSubmit(onSubmit)} className="new_comment" id="new_comment" method="post">
            <StyledEnclosingDiv>
                { flashMsg }
                <StyledTextArea className="textarea" cols="70" ref={register({required: true})} id="comment_comment" name="comment" rows="6"
                              spellCheck="false"></StyledTextArea>


            </StyledEnclosingDiv>
            <p id="close-check">
                <input id="close_ticket" name="close_ticket" ref={register} type="checkbox"/>
                <label htmlFor="close_ticket">Close ticket with this comment</label>
            </p>
            <p>
                <SecondaryButtonStyled className="button" id="comment_submit" name="commit" type="submit"
                       value="Add Comment"/>
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

CommentForm.propTypes = {
    toggleForm: PropTypes.func,
    state: PropTypes.object,
    id: PropTypes.string
};


