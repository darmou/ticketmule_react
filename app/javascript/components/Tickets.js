import React from "react";
import TicketsTable from "./TicketsTable";
import styled from "styled-components";
import { TicketBoardStyled } from "./TicketBoard";
import useGetTickets from "../hooks/use_get_tickets";
import { ticketsTypes } from "../actions/ticket_store";

const Tickets =  () => {
    const { tickets, isLoading } = useGetTickets(ticketsTypes.NOT_CLOSED);

    return(<TicketsStyled>
        <h2>Tickets</h2>
        { (tickets && !isLoading) &&
            <TicketsTable isAgo={false} tickets={tickets}/>
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