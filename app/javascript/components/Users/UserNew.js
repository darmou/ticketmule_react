import React, { useContext } from "react";
import AResourceStyled from "../ComponentLibrary/AResourceStyled";
import { queryCache, useMutation } from "react-query";
import useTicketmule from "../../hooks/useTicketMule";
import { PropTypes } from "prop-types";
import { useNavigate } from "react-router-dom";
import UserStore from "../../actions/userStore";
import UserForm from "./UserForm";
import { TicketContext } from "../../packs/application";

const UserNew = () => {
    const { state, dispatch } = useContext(TicketContext);
    const { user } = state;
    const navigate = useNavigate();
    const ticketMule = useTicketmule();

    const [addTheUser] = useMutation(
        ticketMule.addResource.bind(this, state, 'users'),
        {
            onSuccess: async (user) => {
                addUser(addUser);
                // Query Invalidations
                await queryCache.invalidateQueries('users');
                navigate(`/users/${user.id}`);
            },
        }
    );

    const addUser = (user) => {
        //We want to just set the current user as we do not know what page we are on
        dispatch({action_fn: UserStore.setUser, user});
    };

    return (<AResourceStyled>
        <h2>New user</h2>
        <UserForm addOrUpdate={addTheUser} user={user} aUser={null}/>
    </AResourceStyled>);
};

UserNew.propTypes = {
    context: PropTypes.object
};

export default UserNew;