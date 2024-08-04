import React from "react";
import moment from "moment";
import { H3ToggleStyled } from "./ComponentLibrary/H3ToggleStyled";
import { SLIDE_DURATION } from "../utils/displayUtils";
import useSliderToggle from "react-slide-toggle-hooks";
import styled from "styled-components";
import Interweave from "interweave";
import { Link } from "react-router-dom";
import { useMutation } from "react-query";
import useTicketmule from "../hooks/useTicketMule";
import { ResourceItem } from "./ComponentLibrary/Resources";
import { DeleteLink } from "./ComponentLibrary/StyledLinks";
import { Timestamp } from "./ComponentLibrary/TimeFormating";
import { Comment, State, Ticket } from "../types/types";
import { queryClient } from "../utils/network";

const CommentSquare = styled.span`
    padding: 3px 2px;
    font-size: 13px;
    background: #ccc;
    color: #fff;
    text-decoration: none;
    border: 1px solid #ccc;
    -moz-border-radius: 3px;
    -webkit-border-radius: 3px;
`;

const DeletedUserLabel = styled.strong`
    padding-left: 5px;
`;

interface Props {
    ticket: Ticket,
    state: State
}

const CommentList = React.memo(({ticket, state}: Props) => {
    const ticketMule = useTicketmule();
    const getSliderToggle = React.useCallback(useSliderToggle,[]);
    const { mutate } = useMutation(
        ticketMule.deleteRelatedTicketRecord.bind(this, state, "comments", ticket.id),
        {
            onSuccess: async () => {
                // Query Invalidations
                queryClient.removeQueries('ticket', { exact: true });
            },
        }
    );

    const { expandableRef, toggle, slideToggleState } =
        getSliderToggle({duration: SLIDE_DURATION});

    const deleteComment = async (id) => {
        if (window.confirm(`Really delete this comment #${id}?`)) {
            //useMutation to use delete method on comment
            await mutate(id);
        }
    };

    const commentList = ticket.comments.map(comment => {
       return (
           <ResourceItem key={`comment_id_${comment.id}`}>

               <CommentSquare>#{comment.id}</CommentSquare>
               {comment.user &&
                    <Link to={`/users/${comment.user.id}`}>{comment.user.username}</Link>
               }
               {!comment.user &&
                <DeletedUserLabel>Deleted User </DeletedUserLabel>
               }
               <Timestamp>{moment(comment.created_at).format("DD MMM YYYY hh:mm A")}</Timestamp>
               <DeleteLink to="" onClick={() => deleteComment(comment.id)}>Delete</DeleteLink>
               <p>
                   <Interweave content={comment.comment}/>
               </p>
           </ResourceItem>
       );
    });

    return (
        <>
            <H3ToggleStyled isOpen={slideToggleState.toggleState} onClick={toggle}>Comments</H3ToggleStyled>
            <div ref={expandableRef} id="comments">
                {commentList}
            </div>
        </>
    );

});


export default CommentList;