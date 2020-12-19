import React from "react";
import { Link } from "react-router-dom";
import TableResource, { dateFormat } from "../Resources/TableResource";
import { Ticket } from "../../types/types";

interface Props {
        ticket: Ticket
}
const TicketTable = ({ticket} : Props) => {
    const contact = (ticket.contact) ? `${ticket.contact.full_name}` : "";
    const data = React.useMemo(
        () => (ticket != null) ? [
        {heading1: <strong>Title:</strong>, data1: ticket.title},
        {heading1: <strong>Contact:</strong>,
            data1: <Link to={`/contacts/${ticket.contact.id}`}>{contact}</Link>,
            heading2: <strong>Created by:</strong>,
            data2: ticket.creator.username
        },
        {
            heading1: <strong>Created at:</strong>, data1: dateFormat(ticket.created_at),
            heading2: <strong>Updated at:</strong>, data2: dateFormat(ticket.updated_at)
        },
        {
            heading1: <strong>Owner:</strong>, data1: ticket.owner.username,
            heading2: <strong>Group:</strong>, data2: ticket.group.name
        },
        {
            heading1: <strong>Status:</strong>, data1: ticket.status.name,
            heading2: <strong>Priority:</strong>, data2: ticket.priority.name},
        {
            heading1: <strong>Time Type:</strong>,
            data1: ticket.time_type.name},
        {
            heading1: <strong>Details:</strong>
        },
        {
            heading1: ticket.details
        }
    ]: [], [ticket]);

    return (
        <TableResource data={data}/>
    );

};



export default TicketTable;

