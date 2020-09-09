import React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import TicketForm  from "./TicketForm";
import { TicketBoardStyled } from "./TicketBoard";


const Ticket = () => {
    const { slug } = useParams();
    return(<TicketStyled>

        <TicketForm id={slug}/>
    </TicketStyled>);
};

export default Ticket;

export const TicketStyled = styled(TicketBoardStyled)`
    float: left;
    margin: 15px 0 0 15px;
    width: calc(72% - 3em);
`;