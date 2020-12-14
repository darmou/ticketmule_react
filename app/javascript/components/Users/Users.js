import React, { useContext } from "react";
import { TicketContext } from "../../packs/application";
import UsersTable from "./UsersTable";
import LetterButtons from "../People/LetterButtons";
import useGetPeople from "../../hooks/useGetPeople";
import { RESOURCE_TYPES } from "../../utils/types";

// eslint-disable-next-line react/display-name
const Users =  React.memo(() => {
    const { users, isLoading } = useGetPeople(RESOURCE_TYPES.USER);
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

