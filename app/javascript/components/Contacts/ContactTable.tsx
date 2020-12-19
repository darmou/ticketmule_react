import React from "react";
import TableResource, { dateFormat } from "../Resources/TableResource";
import { Contact } from "../../types/types";

interface Props {
    contact: Contact
}

// eslint-disable-next-line react/display-name
const ContactTable = React.memo(({contact}: Props) => {

    const data = React.useMemo(
        () => (contact != null) ? [
        {
            heading1: <strong>First name:</strong>, data1: contact.first_name,
            heading2: <strong>Last name:</strong>, data2: contact.last_name
        },
        {
            heading1: <strong>Email:</strong>, data1: contact.email,
            heading2: <strong>Affiliation::</strong>, data2: contact.affiliation
        },
        {
            heading1: <strong>Mobile phone:</strong>, data1: contact.mobile_phone,
            heading2: <strong>Office phone:</strong>, data2: contact.office_phone
        },
        {
            heading1: <strong>Updated at:</strong>, data1: dateFormat(contact.updated_at)
        },
        {
            heading1: <strong>Notes:</strong>},
        {
            heading1: contact.notes
        }
    ]: [], [contact]);


    return (
        <TableResource data={data}/>
    );
});



export default ContactTable;
