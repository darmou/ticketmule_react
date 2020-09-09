import styled, { css } from "styled-components";
import { renderTableHeader } from "../utils/display_utils";
import SlideToggle from "react-slide-toggle";
import React from "react";
import PropTypes from "prop-types";
import { header, TableListingStyled } from "./TicketBoard";
import PlusImage from "../images/plus.gif";
import MinusImage from "../images/minus.gif";

const SLIDE_STATES = {
    EXPANDED: 'EXPANDED',
    EXPANDING: 'EXPANDING',
    COLLAPSED: 'COLLAPSED',
    COLLAPSING: 'COLLAPSING'
};
Object.freeze(SLIDE_STATES);

const TableSection = ({slideDuration, headerItems, theTickets, sectionName, sectionId}) => {
    return (
        <SlideToggle
            duration={slideDuration}
            render={({ toggle, setCollapsibleElement, toggleState }) => (
                <>
                    <H3ToggleStyled  isOpen={toggleState} onClick={toggle}>{sectionName}</H3ToggleStyled>
                    <div css={css``} id={sectionId} ref={setCollapsibleElement}>
                        <TableListingStyled cellSpacing="0">
                            <thead>
                            { renderTableHeader(headerItems, css(header)) }
                            </thead>
                            <tbody>
                            {theTickets}
                            </tbody>
                        </TableListingStyled>

                    </div>
                </>
            )}
        />
    );
};

TableSection.propTypes = {
    slideDuration: PropTypes.number,
    headerItems: PropTypes.array,
    theTickets: PropTypes.array,
    sectionName: PropTypes.string,
    sectionId: PropTypes.string
};

const H3ToggleStyled = styled.h3`
    padding: 6px 0 6px 20px;
    background: ${({isOpen}) => `url(${(isOpen === SLIDE_STATES.COLLAPSED.toString() || isOpen === SLIDE_STATES.COLLAPSING) ? PlusImage : MinusImage}) no-repeat left center`};
    &:hover {
      cursor: pointer;
      color: #90af4c;
    }
`;

export { TableSection, H3ToggleStyled };