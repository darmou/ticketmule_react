import React, { useContext } from "react";
import TicketTable from "./TicketTable";
import styled from "styled-components";
import { TicketBoardStyled } from "./TicketBoard";
import { TicketContext } from "../packs/application";

const Tickets = () => {
    const { state } = useContext(TicketContext);

    return(<TicketsStyled>
        <h2>Tickets</h2>
        <TicketTable tickets={state.tickets}/>

    </TicketsStyled>);
};

export default Tickets;

const TicketsStyled = styled(TicketBoardStyled)`
    float: left;
    margin: 15px 0 0 15px;
    width: calc(72% - 3em);
`;