import React from "react";
import UserForm from "./UserForm";
import useAddUser from "../../hooks/useAddUser";

const UserNew = () => {
    const { addTheUser } = useAddUser();

    return (<>
        <h2>New User</h2>
        <UserForm formAction={addTheUser} aUser={null}/>
    </>);
};

export default UserNew;