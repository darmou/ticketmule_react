import React from "react";
import UserForm from "../Users/UserForm";
import useAddUser from "../../hooks/useAddUser";


// eslint-disable-next-line react/display-name
const AdminUsers = React.memo(() => {
    const addTheUser = useAddUser(true);

    return(
        <UserForm formAction={addTheUser} aUser={null} isAdminForm={true}/>
    );
});

export default AdminUsers;