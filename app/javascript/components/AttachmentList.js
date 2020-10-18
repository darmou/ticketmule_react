import React from "react";
import moment from "moment";
import { H3ToggleStyled } from "./TableSection";
import { SLIDE_DURATION } from "./TicketBoard";
import useSliderToggle from "react-slide-toggle-hooks";
import styled from "styled-components";
import PropTypes from "prop-types";
import TextDocumentIcon from "../images/document-text.png";
import PdfDocumentIcon from "../images/document-pdf.png";
import ExcelDocumentIcon from "../images/document-excel.png";
import PowerPointDocumentIcon from "../images/document-powerpoint.png";
import MusicDocumentIcon from "../images/document-music.png";
import WordDocumentIcon from "../images/document-word.png";
import ImageDocumentIcon from "../images/document-image.png";
import { useMutation, queryCache } from "react-query";
import useTicketmule from "../hooks/use_ticketmule";
import { Timestamp, DeleteLink } from "./CommentList";
import { getAttachmentFileSize } from "../utils/display_utils";

const DOC_TYPES = {
    "application/pdf": PdfDocumentIcon,
    "application/word": WordDocumentIcon,
    "application/mspowerpoint": PowerPointDocumentIcon,
    "application/excel": ExcelDocumentIcon
};

const Attachment = styled.li`
    padding: 4px 0;
    margin: 0;
    display: block;

    
    a {
        background: transparent url(${({image}) => image}) no-repeat 0 2px;
        padding: 3px 4px 3px 20px;
    }
    
    &:hover {

      a {
        display: initial;
      }

    }
`;

const StyledUL = styled.ul`
    list-style: none;
    padding-inline-start: 0px;
`;


const AttachmentList = React.memo(({attachments, state}) => {
    const ticketMule = useTicketmule();
    const getSliderToggle = React.useCallback(useSliderToggle,[]);
    const [deleteTheAttachment] = useMutation(
        ticketMule.deleteRelatedTicketRecord.bind(this, state, "attachments"),
        {
            onSuccess: async () => {
                // Query Invalidations
                await queryCache.invalidateQueries('ticket');
            },
        }
    );

    const { expandableRef, toggle, slideToggleState } =
        getSliderToggle({duration: SLIDE_DURATION});

    const deleteAttachment = async (id) => {
        if (window.confirm(`Really delete this attachment #${id}?`)) {
            //useMutation to use delete method on attachment
            await deleteTheAttachment(id);
        }
    };

    const getAttachmentImage = (dataContentType) => {
        if (DOC_TYPES.hasOwnProperty(dataContentType)) {
            return DOC_TYPES[dataContentType];
        } else if (dataContentType.search(/image\//i) > -1) {
            return ImageDocumentIcon;
        } else if (dataContentType.search(/audio\//i) > -1) {
            return MusicDocumentIcon;
        } else {
            return TextDocumentIcon;
        }
    };

    const attachmentList = attachments.map(attachment => {
        const fileSizeKB = getAttachmentFileSize(attachment.data_file_size);

        return (
            <Attachment image={getAttachmentImage(attachment.data_content_type)} key={`attachment_id_${attachment.id}`}>
                <a href={attachment.url}>{attachment.data_file_name}</a> ({fileSizeKB}KB)&nbsp;
                <Timestamp><strong>{attachment.user.username}</strong> at {moment(attachment.created_at).format("DD MMM YYYY hh:mm A")}
                </Timestamp>
                <DeleteLink to="" onClick={() => deleteAttachment(attachment.id)}>Delete</DeleteLink>
            </Attachment>
        );
    });

    return (
        <>
            <H3ToggleStyled isOpen={slideToggleState.toggleState} onClick={toggle}>Attachments</H3ToggleStyled>
            <div ref={expandableRef} id="attachment-list">
                <StyledUL>
                {attachmentList}
                </StyledUL>
            </div>
        </>
    );

});

AttachmentList.propTypes = {
    attachments: PropTypes.array,
    state: PropTypes.object
};

export default AttachmentList;