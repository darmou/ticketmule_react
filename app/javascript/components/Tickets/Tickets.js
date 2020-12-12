import React, {useContext} from "react";
import TicketsTable from "./TicketsTable";
import styled from "styled-components";
import useGetTickets from "../../hooks/useGetTickets";
import { TicketContext } from "../../packs/application";
import usePrevious from "../../hooks/usePrevious";
import TicketStore from "../../actions/ticketStore";
import ResourceStyled from "../ComponentLibrary/ResourceStyled";

const TicketsPerPage = styled.div`
    float: right;
`;

const Tickets =  React.memo(() => {
    const { tickets, isLoading } = useGetTickets();
    const filteredTickets = (tickets) ? tickets.filter(ticket => ticket.status.name  !== "Closed") : null;
    const { state, dispatch } = useContext(TicketContext);
    const { ticketPageInfo  } = state;
    const { perPage } = ticketPageInfo;

    const _perPageRef = React.useRef();

    if (_perPageRef.current == null) {
        _perPageRef.current = perPage;
    }
    const prevPerPage = usePrevious(_perPageRef.current);

    const updatePageLength = (event, pageLen) => {
        event.preventDefault();
        event.stopPropagation();
        //_perPageRef.current = pageLen;
        dispatch({action_fn: TicketStore.setPerPage, perPage: pageLen});
    };

    React.useEffect(() => {
        if (prevPerPage !== _perPageRef.current && _perPageRef.current != null) {
            dispatch({action_fn: TicketStore.setPerPage, perPage: _perPageRef.current});
        }

    }, [_perPageRef.current, prevPerPage]);

    const perPages = [10, 20, 30].map((pageLen, idx, array) => {
        const separator = (idx < (array.length-1)) ? ', ' :'';
        return (pageLen === perPage) ? <span key={`pageLen_${idx}`}>{pageLen}{separator}</span> :
            <span key={`pageLen_${idx}`}><a href="" onClick={(event) => updatePageLength(event, pageLen)}>{pageLen}</a>
                {separator}</span>;
    });

    return (<ResourceStyled>
        <TicketsPerPage>Tickets per page: {perPages}</TicketsPerPage>
        <h2>Tickets</h2>
        { (filteredTickets && !isLoading ) &&
            <TicketsTable isPagination={true} isAgo={false} tickets={filteredTickets}/>
        }
    </ResourceStyled>);
});

export default Tickets;

