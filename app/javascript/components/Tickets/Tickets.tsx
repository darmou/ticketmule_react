import React, { useContext } from "react";
import TicketsTable from "./TicketsTable";
import styled from "styled-components";
import useGetTickets from "../../hooks/useGetTickets";
import { TicketContext } from "../../packs/application";
import TicketStore from "../../actions/ticketStore";

const TicketsPerPage = styled.div`
    float: right;
`;

// eslint-disable-next-line react/display-name
const Tickets =  React.memo(() => {
    const { tickets, isLoading } = useGetTickets();
    const { state, dispatch } = useContext(TicketContext);
    const { ticketPageInfo  } = state;
    const { perPage, searchString } = ticketPageInfo;
    const filteredTickets = (tickets) ? (searchString.includes("search[status_id]=2")) ? tickets : tickets.filter(ticket => ticket.status.name  !== "Closed") : null;

    const updatePageLength = (event, pageLen) => {
        event.preventDefault();
        event.stopPropagation();
        dispatch({action_fn: TicketStore.setPerPage, perPage: pageLen});
    };

    const perPages = [10, 20, 30].map((pageLen, idx, array) => {
        const separator = (idx < (array.length-1)) ? ', ' :'';
        return (pageLen === perPage) ? <span key={`pageLen_${idx}`}>{pageLen}{separator}</span> :
            <span key={`pageLen_${idx}`}><a href="" onClick={(event) => updatePageLength(event, pageLen)}>{pageLen}</a>
                {separator}</span>;
    });

    return (<>
        <TicketsPerPage>Tickets per page: {perPages}</TicketsPerPage>
        <h2>Tickets</h2>
        { (filteredTickets && !isLoading ) &&
            <TicketsTable isPagination={true} isAgo={false} tickets={filteredTickets}/>
        }
    </>);
});

export default Tickets;
