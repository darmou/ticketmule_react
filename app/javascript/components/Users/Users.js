import React, { useContext } from "react";
import { TicketContext } from "../../packs/application";
import ResourceStyled from "../ComponentLibrary/ResourceStyled";
import UsersTable from "./UsersTable";
import LetterButtons from "../People/LetterButtons";
import useGetPeople from "../../hooks/useGetPeople";
import { RESOURCE_TYPES } from "../../utils/types";

// eslint-disable-next-line react/display-name
const Users =  React.memo(() => {
    const { users, isLoading } = useGetPeople(RESOURCE_TYPES.USER);
    const { state } = useContext(TicketContext);
    const { userPageInfo  } = state;

    return (<ResourceStyled>
        <h2>Users</h2>
        <LetterButtons resourcePageInfo={userPageInfo} />

        { (users && !isLoading ) &&
         <UsersTable users={users}/>
        }
    </ResourceStyled>);
});

export default Users;

