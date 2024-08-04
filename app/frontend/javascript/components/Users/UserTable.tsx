import React from "react";
import { User } from "../../types/types";
import TableResource, { dateFormat } from "../Resources/TableResource";

interface Props {
    aUser: User
}

// eslint-disable-next-line react/display-name
const UserTable = React.memo(({aUser}: Props) => {

    const data = React.useMemo(
        () => (aUser != null) ? [
        {
            heading1: <strong>First name:</strong>, data1: aUser.first_name,
            heading2: <strong>Last name:</strong>, data2: aUser.last_name
        },
        {
            heading1: <strong>Email:</strong>, data1: aUser.email,
            heading2: <strong>Timezone:</strong>, data2: aUser.time_zone
        },
        {
            heading1: <strong>Last login:</strong>, data1: dateFormat(aUser.last_sign_in_at),
            heading2: <strong>Last Login IP:</strong>, data2: aUser.last_sign_in_ip
        },
    ]: [], [aUser]);

    return (
        <TableResource data={data}/>
    );
});



export default UserTable;
