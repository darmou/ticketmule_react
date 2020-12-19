import React from "react";
import UserForm from "./UserForm";
import useAddUser from "../../hooks/useAddUser";

const UserNew = () => {
    const { addTheUser } = useAddUser();

    return (<>
        <h2>New user</h2>
        <UserForm addOrUpdate={addTheUser} aUser={null}/>
    </>);
};

export default UserNew;