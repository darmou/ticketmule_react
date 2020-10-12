import React from "react";
import TicketForm from "./TicketForm";
import TicketStyled from "./Ticket";

const TicketNew = () => {
    return (<TicketStyled>
        <h2>New ticket</h2>
        <TicketForm/>
    </TicketStyled>);
};

export default TicketNew;

