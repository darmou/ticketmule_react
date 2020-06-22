import React, {useContext, useEffect} from "react";
import TicketTable from "./TicketTable";
import styled from "styled-components";
import {TicketBoardStyled} from "./TicketBoard";
import {TicketContext} from "../packs/application";
import {fetchTickets} from "../actions";

const Tickets = () => {
    const { state, dispatch } = useContext(TicketContext);
    const { tickets, user} = state;

    useEffect( () => {
        async function fetchTicketData() {
            await fetchTickets(user.email, user.authentication_token, dispatch);
        }
        if (tickets == null) {
            fetchTicketData();
        }
    }, [tickets, user, dispatch]); // Or [] if effect doesn't need props or state*/

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