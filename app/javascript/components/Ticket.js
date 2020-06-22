import React from "react";
import styled from "styled-components";
import { TicketBoardStyled } from "./TicketBoard";


const Ticket = () => {

    return(<TicketStyled>
        <h2>New ticket</h2>
        <TicketForm />
    </TicketStyled>);
};

export default Ticket;

const TicketStyled = styled(TicketBoardStyled)`
    float: left;
    margin: 15px 0 0 15px;
    width: calc(72% - 3em);
`;