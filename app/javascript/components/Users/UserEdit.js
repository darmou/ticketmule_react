import React, { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UserForm from "./UserForm";
import { queryCache, useMutation } from "react-query";
import useTicketmule from "../../hooks/useTicketMule";
import UserStore from "../../actions/userStore";
import useGetUser from "../../hooks/useGetUser";
import { TicketContext } from "../../packs/application";
import { RESOURCE_TYPES } from "../../utils/types";
import { createStandardSuccessMessage } from "../ComponentLibrary/FlashMessages";
import TicketStore from "../../actions/ticketStore";

const UserEdit = () => {
    const { state, dispatch } = useContext(TicketContext);
    const { user } = state;
    const { slug } = useParams();
    const aUser = useGetUser(slug);
    const navigate = useNavigate();

    const ticketMule = useTicketmule();
    const [editTheUser] = useMutation(
        ticketMule.updateResource.bind(this, state, RESOURCE_TYPES.USER),
        {
            onSuccess: async (user) => {
                dispatch({
                    action_fn: TicketStore.setFlashMsg,
                    flashMsg: createStandardSuccessMessage(`${user.username} was successfully edited!`)});

                editUser(user);
                // Query Invalidations
                await queryCache.invalidateQueries('user');
                navigate(`/users/${user.id}`);
            },
        }
    );

    const editUser = (user) => {
        dispatch({action_fn: UserStore.setAUser, user});
    };

    return (<>
        {(user) &&
            <>
        <h2>Editing user {user.full_name}</h2>
            <UserForm addOrUpdate={editUser} user={user} formAction={editTheUser} slug={slug} aUser={aUser} />
            </>
        }
    </>);
};


export default UserEdit;