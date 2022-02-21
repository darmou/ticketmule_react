import React, { useContext } from "react";
import { TicketContext } from "../../application";
import UsersTable from "./UsersTable";
import LetterButtons from "../People/LetterButtons";
import useGetResources from "../../hooks/useGetResources";
import { RESOURCE_TYPES } from "../../types/types";

// eslint-disable-next-line react/display-name
const Users =  React.memo(() => {
    const { users, isLoading } = useGetResources(RESOURCE_TYPES.USER);
    const { state } = useContext(TicketContext);
    const { userPageInfo  } = state;

    return (<>
        <h2>Users</h2>
        <LetterButtons resourcePageInfo={userPageInfo} resourceType={RESOURCE_TYPES.USER} />

        { (users && !isLoading ) &&
         <UsersTable users={users}/>
        }
    </>);
});

export default Users;

