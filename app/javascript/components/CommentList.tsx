import React from "react";
import moment from "moment";
import { H3ToggleStyled } from "./ComponentLibrary/H3ToggleStyled";
import { SLIDE_DURATION } from "../utils/displayUtils";
import useSliderToggle from "react-slide-toggle-hooks";
import styled from "styled-components";
import Interweave from "interweave";
import { Link } from "react-router-dom";
import { useMutation, queryCache } from "react-query";
import useTicketmule from "../hooks/useTicketMule";
import { ResourceItem } from "./ComponentLibrary/Resources";
import { DeleteLink } from "./ComponentLibrary/StyledLinks";
import { Timestamp } from "./ComponentLibrary/TimeFormating";
import { Comment, State } from "../types/types";

const CommentSquare = styled.span`
    padding: 3px 2px;
    font-size: 13px;
    background: #ccc;
    color: #fff;
    text-decoration: none;
    padding: 1px 5px;
    border: 1px solid #ccc;
    -moz-border-radius: 3px;
    -webkit-border-radius: 3px;

`;

const DeletedUserLabel = styled.strong`
    padding-left: 5px;
`;

interface Props {
    comments: Comment[],
    state: State
}

const CommentList = React.memo(({comments, state}: Props) => {
    const ticketMule = useTicketmule();
    const getSliderToggle = React.useCallback(useSliderToggle,[]);
    const [deleteTheComment] = useMutation(
        ticketMule.deleteRelatedTicketRecord.bind(this, state, "comments"),
        {
            onSuccess: async () => {
                // Query Invalidations
                await queryCache.invalidateQueries('ticket');
            },
        }
    );

    const { expandableRef, toggle, slideToggleState } =
        getSliderToggle({duration: SLIDE_DURATION});

    const deleteComment = async (id) => {
        if (window.confirm(`Really delete this comment #${id}?`)) {
            //useMutation to use delete method on comment
            await deleteTheComment(id);
        }
    };

    const commentList = comments.map(comment => {
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