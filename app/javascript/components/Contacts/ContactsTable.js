import React from "react";
import moment from "moment";
import { PropTypes } from "prop-types";
import { Link } from "react-router-dom";
import usePrevious from "../../hooks/usePrevious";
import {RESOURCE_TYPES} from "../../utils/types";
import ResourcesTable from "../Resources/ResourcesTable";
import { personDateFormat } from "../../utils/displayUtils";


const ContactsTable = React.memo(({contacts}) => {
    const prevContacts = usePrevious(contacts);
    const contactsRef = React.useRef();
    if (contactsRef.current == null || JSON.stringify(contacts) !== JSON.stringify(prevContacts)) {
        contactsRef.current = contacts;
    }

    const getColumns = () => {
        return [
            {
                Header: 'Name',
                accessor: 'name',
            },
            {
                Header: 'Affiliation',
                accessor: 'affiliation',
            },
            {
                Header: 'Disabled at',
                accessor: 'disabled_at',
            }

        ];
    };

    const getData =() => {
        return (contactsRef.current != null) ? contactsRef.current.map((contact) => {
            const disabledAt = (contact.disabled_at) ? moment(contact.disabled_at).format(personDateFormat) : null;
            return {
                name: <Link to={`/contacts/${contact.id}`}>{contact.first_name} {contact.last_name}</Link>,
                affiliation: contact.affiliation,
                disabled_at: disabledAt
            };
        }) : [];
    };

    const data = React.useMemo(() => getData(), [contactsRef.current]);
    const columns = React.useMemo(getColumns, []);

    return (
        <ResourcesTable columns={columns} data={data} isPagination={true} resourceType={RESOURCE_TYPES.CONTACT} />
    );
});


ContactsTable.propTypes = {
    contacts: PropTypes.array
};

export default ContactsTable;


