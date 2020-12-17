import React, {useContext} from "react";
import UserForm from "../Users/UserForm";
import useAddUser from "../../hooks/useAddUser";
import { TicketContext } from "../../packs/application";

// eslint-disable-next-line react/display-name
const AdminUsers = React.memo(() => {
    const addTheUser = useAddUser(true);
    const { state } = useContext(TicketContext);
    const { user }  = state;

    return(
        <UserForm addOrUpdate={addTheUser} user={user} aUser={null} isAdminForm={true}/>
    );
});

export default AdminUsers;