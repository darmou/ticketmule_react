import React from "react";
import moment from "moment";
import { PropTypes } from "prop-types";
import { Link } from "react-router-dom";
import usePrevious from "../../hooks/usePrevious";
import { RESOURCE_TYPES } from "../../utils/types";
import ResourcesTable from "../Resources/ResourcesTable";
import { personDateFormat } from "../../utils/displayUtils";


// eslint-disable-next-line react/display-name
const UsersTable = React.memo(({users}) => {
    const prevUsers = usePrevious(users);
    const usersRef = React.useRef();
    if (usersRef.current == null || JSON.stringify(users) !== JSON.stringify(prevUsers)) {
        usersRef.current = users;
    }

    const getColumns = () => {
        return [
            {
                Header: 'Username',
                accessor: 'username',
            },
            {
                Header: 'Name',
                accessor: 'name',
            },
            {
                Header: 'Email',
                accessor: 'email',
            },
            {
                Header: 'Last login',
                accessor: 'last_login',
            },
            {
                Header: 'Disabled at',
                accessor: 'disabled_at',
            }
        ];
    };

    const getData =() => {
        return (usersRef.current != null) ? usersRef.current.map((user) => {
            const disabledAt = (user.disabled_at) ? moment(user.disabled_at).format(personDateFormat) : null;
            const lastLogin = (user.last_sign_in_at) ? moment(user.last_sign_in_at).format(personDateFormat) : null;
            return {
                username: <Link to={`/users/${user.id}`}>{user.username}</Link>,
                name: user.full_name,
                email: user.email,
                last_login: lastLogin,
                disabled_at: disabledAt
            };
        }) : [];
    };

    const data = React.useMemo(() => getData(), [usersRef.current]);
    const columns = React.useMemo(getColumns, []);

    return (
        <ResourcesTable columns={columns} data={data} isPagination={true} resourceType={RESOURCE_TYPES.USER} />
    );
});


UsersTable.propTypes = {
    users: PropTypes.array
};

export default UsersTable;


