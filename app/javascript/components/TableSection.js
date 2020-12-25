import { css } from "styled-components";
import React, { memo } from "react";
import PropTypes from "prop-types";
import { H3ToggleStyled } from "./ComponentLibrary/H3ToggleStyled";
import TicketsTable from "./Tickets/TicketsTable";
import useSliderToggle from "react-slide-toggle-hooks";
import { TICKET_STATUS_TYPES } from "../types/types";
import { SLIDE_DURATION } from "../utils/displayUtils";

const MAX_TICKETS_INDEX = 6;

const TableSection = memo(({isLoading, type, tickets, sectionName, sectionId}) => {

    const filteredTickets = (tickets) ? tickets.slice(0, MAX_TICKETS_INDEX).filter(ticket => {
       return (type == TICKET_STATUS_TYPES.NOT_CLOSED) ? ticket.status.name !== "Closed" : ticket.status.name === "Closed";
    }) : null;

    const { expandableRef, slideToggleState, toggle } = useSliderToggle({duration: SLIDE_DURATION});

    return (<>
        <H3ToggleStyled isOpen={slideToggleState.toggleState} onClick={toggle}>{sectionName}</H3ToggleStyled>
        <div  css={css``} id={sectionId}  ref={expandableRef}>
            {(!isLoading && filteredTickets) &&
            <TicketsTable setCurrentPage={()=> {}} page={1} pages={1} isPagination={false} isAgo={true} tickets={filteredTickets}/>
            }
        </div>
    </>);
});

TableSection.propTypes = {
    isLoading: PropTypes.bool,
    type: PropTypes.string,
    tickets: PropTypes.array,
    slideDuration: PropTypes.number,
    headerItems: PropTypes.array,
    sectionName: PropTypes.string,
    sectionId: PropTypes.string
};

export { TableSection };