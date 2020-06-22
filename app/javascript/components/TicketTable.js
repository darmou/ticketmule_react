import React from "react";
import styled from "styled-components";
import { PropTypes } from "prop-types";
//import matchSorter from "match-sorter";
import { useTable } from "react-table";
//import tbStyles from "styles/TicketBoard";
import { TableListingStyled, header } from "./TicketBoard";
import { getTimeDiff } from "./TicketBoard";

/*const fuzzyTextFilterFn = (rows, id, filterValue) => {
    return matchSorter(rows, filterValue, {keys: [row => row.values[id]]});
};*/

const TicketTable = ({tickets}) => {
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

    const data = (tickets != null ) ? tickets.map((ticket) => {
        const timeDiff = getTimeDiff(ticket.updated_at);

        return {
            id: ticket.id,
            title: ticket.title,
            group: ticket.group.name,
            status: ticket.status.name,
            priority: ticket.priority.name,
            timeType: ticket.time_type.name,
            owner: ticket.owner.username,
            lastActivity: `${timeDiff[0]} ${timeDiff[1]} ago`
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


TicketTable.propTypes = {
    tickets: PropTypes.array
};

export default TicketTable;

const TRHeaderStyled = styled.tr`
    ${header}
`;
