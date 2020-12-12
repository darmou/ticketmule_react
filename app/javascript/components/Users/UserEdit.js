import React, { useContext } from "react";
import AResourceStyled from "../ComponentLibrary/AResourceStyled";
import {useNavigate, useParams} from "react-router-dom";
import UserForm from "./UserForm";
import {queryCache, useMutation} from "react-query";
import useTicketmule from "../../hooks/useTicketMule";
import UserStore from "../../actions/userStore";
import useGetUser from "../../hooks/useGetUser";
import { TicketContext } from "../../packs/application";
import { RESOURCE_TYPES } from "../../utils/types";

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
                editUser(user);
                // Query Invalidations
                await queryCache.invalidateQueries('user');
                navigate(`/users/${user.id}`);
            },
        }
    );

    const editUser = (user) => {
        dispatch({action_fn: UserStore.setUser, user});
    };

    return (<AResourceStyled>
        {(user) &&
            <>
        <h2>Editing user {user.full_name}</h2>
            <UserForm addOrUpdate={editUser} user={user} formAction={editTheUser} slug={slug} aUser={aUser} />
            </>
        }
    </AResourceStyled>);
};

export default UserEdit;