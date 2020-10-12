import React from "react";
import { Link } from "react-router-dom";
import { PropTypes } from "prop-types";
import { useTable } from "react-table";
import { TableListingStyled } from "./TicketBoard";

const TicketTable = React.memo(({ticket}) => {
    const columns = [
        {
            Header: 'Heading 1',
            accessor: 'heading1',
        },
        {
            Header: 'Data 1',
            accessor: 'data1',
        },
        {
            Header: 'Heading 2',
            accessor: 'heading2',
        },
        {
            Header: 'Data 2',
            accessor: 'data2',
        },
    ];

   const dateFormat = (strDate) => {
        return new Intl.DateTimeFormat("en-GB", {
            year: "numeric",
            month: "long",
            day: "2-digit",
            hour12: true,
            hour: 'numeric', minute: 'numeric', second: 'numeric',
        }).format(new Date(strDate));
    };
    const contact = `${ticket.contact.last_name}, ${ticket.contact.first_name}`;
    const data = (ticket != null) ? [
        {heading1: <strong>Title:</strong>, data1: ticket.title},
        {heading1: <strong>Contact:</strong>,
            data1: <Link to={`/contacts/${ticket.contact_id}`}>{contact}</Link>,
            heading2: <strong>Created by:</strong>,
            data2: ticket.owner.username
        },
        {
            heading1: <strong>Created at:</strong>, data1: dateFormat(ticket.created_at),
            heading2: <strong>Updated at:</strong>, data2: dateFormat(ticket.updated_at)
        },
        {heading1: <strong>Owner:</strong>, data1: ticket.owner.username, heading2: <strong>Group:</strong>, data2: ticket.group.name},
        {heading1: <strong>Status:</strong>, data1: ticket.status.name, heading2: <strong>Priority:</strong>, data2: ticket.priority.name},
        {heading1: <strong>Time Type:</strong>, data1: ticket.time_type.name},
        {heading1: <strong>Details:</strong>},
        {data1: ticket.details}
    ]: [];


    const {
        rows,
        prepareRow
    } = useTable({
        columns,
        data,
    });

    // Render the UI for your table
    return (
        <TableListingStyled >
            <tbody>
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
});


TicketTable.propTypes = {
    ticket: PropTypes.object
};

export default TicketTable;

