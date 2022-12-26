import React, { memo } from "react";
import { H3ToggleStyled } from "./ComponentLibrary/H3ToggleStyled";
import TicketsTable from "./Tickets/TicketsTable";
import useSliderToggle from "react-slide-toggle-hooks";
import { TICKET_STATUS_TYPES, Ticket } from "../types/types";
import { SLIDE_DURATION } from "../utils/displayUtils";

const MAX_TICKETS_INDEX = 6;

interface Props  {
    isLoading: boolean,
    type: TICKET_STATUS_TYPES,
    tickets: Ticket[],
    sectionName: string,
    sectionId: string
}

const TableSection = memo(({isLoading, type, tickets, sectionName, sectionId}: Props) => {

    const filteredTickets = (tickets) ? tickets.slice(0, MAX_TICKETS_INDEX).filter(ticket => {
       return (type == TICKET_STATUS_TYPES.NOT_CLOSED) ? ticket?.status?.name !== "Closed" : ticket?.status?.name === "Closed";
    }) : null;

    const { expandableRef, slideToggleState, toggle } = useSliderToggle({duration: SLIDE_DURATION});
    
    return (<>
        <H3ToggleStyled isOpen={slideToggleState.toggleState} onClick={toggle}>{sectionName}</H3ToggleStyled>
        <div id={sectionId}  ref={expandableRef}>
            {(!isLoading && filteredTickets) &&
                <TicketsTable tickets={filteredTickets} isAgo={true} isPagination={false}/>
            }
        </div>
    </>);
});

export { TableSection };