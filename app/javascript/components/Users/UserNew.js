import React, { useContext } from "react";
import { PropTypes } from "prop-types";
import UserForm from "./UserForm";
import { TicketContext } from "../../packs/application";
import useAddUser from "../../hooks/useAddUser";

const UserNew = () => {
    const { state } = useContext(TicketContext);
    const { user } = state;
    const { addTheUser } = useAddUser();

    return (<>
        <h2>New user</h2>
        <UserForm addOrUpdate={addTheUser} user={user} aUser={null}/>
    </>);
};

UserNew.propTypes = {
    context: PropTypes.object
};

export default UserNew;