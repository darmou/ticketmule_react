import styled, { css } from "styled-components";
import React, { memo } from "react";
import PropTypes from "prop-types";
import PlusImage from "../images/plus.gif";
import MinusImage from "../images/minus.gif";
import TicketsTable from "./TicketsTable";
import useGetTickets from "../hooks/use_get_tickets";
import useSliderToggle from "react-slide-toggle-hooks";

export const SLIDE_STATES = {
    EXPANDED: 'EXPANDED',
    EXPANDING: 'EXPANDING',
    COLLAPSED: 'COLLAPSED',
    COLLAPSING: 'COLLAPSING'
};
Object.freeze(SLIDE_STATES);


const TableSection = memo(({type, slideDuration, sectionName, sectionId}) => {
    const { tickets, isLoading } = useGetTickets(type);

    const { expandableRef, slideToggleState, toggle } = useSliderToggle({duration: slideDuration});

    return (<>
        <H3ToggleStyled isOpen={slideToggleState.toggleState} onClick={toggle}>{sectionName}</H3ToggleStyled>
        <div  css={css``} id={sectionId}  ref={expandableRef}>
            {(!isLoading && tickets) &&
            <TicketsTable isAgo={true} tickets={tickets}/>
            }
        </div>
            </>);
});

TableSection.propTypes = {
    type: PropTypes.string,
    slideDuration: PropTypes.number,
    headerItems: PropTypes.array,
    sectionName: PropTypes.string,
    sectionId: PropTypes.string
};

const H3ToggleStyled = styled.h3`
    padding: 6px 0 6px 20px;
    background: ${({isOpen}) => `url(${(isOpen === SLIDE_STATES.COLLAPSED || isOpen === SLIDE_STATES.COLLAPSING) ? PlusImage : MinusImage}) no-repeat left center`};
    &:hover {
      cursor: pointer;
      color: #90af4c;
    }
`;

export { TableSection, H3ToggleStyled };