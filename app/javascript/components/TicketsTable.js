import React from "react";
import styled from "styled-components";
import moment from "moment";
import { PropTypes } from "prop-types";
import { useTable } from "react-table";
import { TableListingStyled, header, getTicketImage, ImageSpan } from "./TicketBoard";
import { Link } from "react-router-dom";


const TicketsTable = ({tickets , isAgo}) => {

    const formatSentence = (str) => {
        if (str.charAt(0) === 'a') {
            return '1' + str.slice(1);
        }
    };

    const columns = [
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
    const dateFormat = "YYYY-MM-DD h:mm:ss A";
    const data = (tickets != null ) ? tickets.map((ticket) => {
        const lastActivity = (!isAgo) ? moment(ticket.updated_at).format(dateFormat) : formatSentence(moment(ticket.updated_at).fromNow());
        return {
            id:  <ImageSpan background={getTicketImage(ticket.priority.id)}>
                <Link to={`/tickets/${ticket.id}`}  title={ticket.title}>{ticket.id}</Link>
            </ImageSpan>,
            title: ticket.title,
            group: ticket.group.name,
            status: ticket.status.name,
            priority: ticket.priority.name,
            timeType: ticket.time_type.name,
            owner: ticket.owner.username,
            lastActivity: lastActivity
        };
    }) : [];

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({
        columns,
        data,
    });

    // Render the UI for your table
    return (
        <TableListingStyled {...getTableProps()}>
            <thead>
            {headerGroups.map((headerGroup, index) => (
                <TRHeaderStyled key={index} {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column, idx) => (
                        <th key={idx} {...column.getHeaderProps()}>{column.render('Header')}</th>
                    ))}
                </TRHeaderStyled>
            ))}
            </thead>
            <tbody {...getTableBodyProps()}>
            {rows.map(
                (row, idx) => {
                    prepareRow(row);
                    return (
                        <tr key={idx} {...row.getRowProps()}>
                            {row.cells.map((cell, i) => {
                                return <td key={i} {...cell.getCellProps()}>{cell.render('Cell')}</td>
                            })}
                        </tr>
                    );}
            )}
            </tbody>
        </TableListingStyled>
    );
};


TicketsTable.propTypes = {
    tickets: PropTypes.array,
    isAgo: PropTypes.bool
};

export default React.memo(TicketsTable);

const TRHeaderStyled = styled.tr`
    ${header}
`;
