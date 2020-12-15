import React from "react";
import moment from "moment";
import { PropTypes } from "prop-types";
import { getTicketImage, ImageSpan } from "./TicketBoard";
import { Link } from "react-router-dom";
import usePrevious from "../../hooks/usePrevious";
import ResourcesTable from "../Resources/ResourcesTable";
import { RESOURCE_TYPES } from "../../utils/types";

const MAX_TICKET_LENGTH = 37;

// eslint-disable-next-line react/display-name
const TicketsTable = React.memo(({tickets, isAgo, isPagination}) => {
    const prevTickets = usePrevious(tickets);
    const ticketsRef = React.useRef();
    if (ticketsRef.current == null || JSON.stringify(tickets) !== JSON.stringify(prevTickets)) {
        ticketsRef.current = tickets;
    }

    const formatSentence = (str) => {
        if (str.charAt(0) === 'a') {
            return '1' + str.slice(1);
        }
    };

    const getColumns = () => {
        return [
            {
                Header: 'Ticket #',
                accessor: 'id',
            },
            {
                Header: 'Title',
                accessor: 'title',
            },
            {
                Header: 'Group',
                accessor: 'group',
            },
            {
                Header: 'Status',
                accessor: 'status',
            },
            {
                Header: 'Priority',
                accessor: 'priority',
            },
            {
                Header: 'Time Type',
                accessor: 'timeType',
            },
            {
                Header: 'Owner',
                accessor: 'owner',
            },
            {
                Header: 'Last Activity',
                accessor: 'lastActivity',
            },

        ];
    };

    const dateFormat = "YYYY-MM-DD h:mm:ss A";

    const getData = () => {
        return (ticketsRef.current != null) ? ticketsRef.current.map((ticket) => {
            const lastActivity = (!isAgo) ? moment(ticket.updated_at).format(dateFormat) : formatSentence(moment(ticket.updated_at).fromNow());
            return {
                id:  <ImageSpan background={getTicketImage(ticket.priority.id)}>
                    <Link to={`/tickets/${ticket.id}`}  title={ticket.title}>{ticket.id}</Link>
                </ImageSpan>,
                title: (ticket.title.length > MAX_TICKET_LENGTH) ?
                    `${ticket.title.substring(0, (MAX_TICKET_LENGTH-1))}...` : ticket.title,
                group: ticket.group.name,
                status: ticket.status.name,
                priority: ticket.priority.name,
                timeType: ticket.time_type.name,
                owner: ticket.owner.username,
                lastActivity: lastActivity
            };
        }) : [];
    };
    const data = React.useMemo(() => getData(), [ticketsRef.current]);
    const columns = React.useMemo(getColumns, []);

    return (
        <ResourcesTable columns={columns} data={data} isPagination={isPagination} resourceType={RESOURCE_TYPES.TICKET}/>
    );
});


TicketsTable.propTypes = {
    tickets: PropTypes.array,
    isAgo: PropTypes.bool,
    isPagination: PropTypes.bool
};

export default TicketsTable;