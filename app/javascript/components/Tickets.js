import React from "react";
import TicketsTable from "./TicketsTable";
import styled from "styled-components";
import { TicketBoardStyled } from "./TicketBoard";
import useGetTickets from "../hooks/use_get_tickets";

const Tickets =  () => {
    const { tickets, isLoading } = useGetTickets();
    const filteredTickets = (tickets) ? tickets.filter(ticket => ticket.status.name  !== "Closed") : null;
    return(<TicketsStyled>
        <h2>Tickets</h2>
        { (filteredTickets && !isLoading) &&
            <TicketsTable isAgo={false} tickets={filteredTickets}/>
        }
    </TicketsStyled>);
};

export default React.memo(Tickets);

export const TicketsStyled = styled(TicketBoardStyled)`
    float: left;
    margin: 15px 0 60px 15px;
    width: calc(72% - 3em);
    min-height: 100%;
`;