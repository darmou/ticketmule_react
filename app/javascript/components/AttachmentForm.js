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


export const AttachmentForm = React.forwardRef((props, ref) => {
    const ticketMule = useTicketmule();
    const { toggleForm } = props;
    const [ flashMsg, setFlashMsg ] = React.useState(null);
    const { handleSubmit, clearErrors, errors, reset } = useForm();
    const [addTheAttachment, info] = useMutation(
        ticketMule.addAttachment.bind(this, props.state),
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
            await addTheAttachment(data);
            reset();
            setFlashMsg(<SuccessNotificationStyled> Attachment added! </SuccessNotificationStyled>);
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

    return (<StyledAttachmentForm style={{display:'none'}} ref={ref} id="add-attachment">

        <form onSubmit={handleSubmit(onSubmit)} className="new_attachment" id="new_attachment" method="post">
            <StyledEnclosingDiv>
                { flashMsg }

                <p>
                    <input id="attachment_data" name="attachment[data]" size="30" type="file"/>
                        <span id="attachment_limit">Limit 10 megabytes</span>
                </p>

            </StyledEnclosingDiv>

            <p>
                <SecondaryButtonStyled className="button" id="attachment_submit" name="commit" type="submit"
                                       value="Add Attachment"/>
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
    toggleForm: PropTypes.func,
    state: PropTypes.object,
    id: PropTypes.string
};


