import React, {useContext} from "react";
import { useNavigate, useParams } from "react-router-dom";
import UserForm from "./UserForm";
import { queryCache, useMutation } from "react-query";
import useTicketmule from "../../hooks/useTicketMule";
import UserStore from "../../actions/userStore";
import useGetResource from "../../hooks/useGetResource";
import { TicketContext } from "../../packs/application";
import { RESOURCE_TYPES, User } from "../../types/types";
import { createStandardSuccessMessage } from "../ComponentLibrary/FlashMessages";
import TicketStore from "../../actions/ticketStore";

const UserEdit = () => {
    const { state, dispatch } = useContext(TicketContext);
    const { user } = state;
    const { slug } = useParams();
    const aUser = useGetResource(parseInt(slug), RESOURCE_TYPES.USER);
    const navigate = useNavigate();

    const ticketMule = useTicketmule();
    const [editTheUser] = useMutation(
        ticketMule.updateResource.bind(this, state, RESOURCE_TYPES.USER),
        {
            onSuccess: async (theUser: User) => {
                dispatch({
                    action_fn: TicketStore.setFlashMsg,
                    flashMsg: createStandardSuccessMessage(`${theUser.username} was successfully edited!`)});

                editUser(theUser);
                // Query Invalidations
                await queryCache.invalidateQueries('AUser');
                navigate(`/users/${theUser.id}`);
            },
        }
    );

    const editUser = (user) => {
        dispatch({action_fn: UserStore.setAUser, user});
    };

    return (<>
        {(aUser && user) &&
            <>
        <h2>Edit {aUser.username}</h2>
            <UserForm addOrUpdate={editUser} formAction={editTheUser} slug={slug} aUser={aUser} />
            </>
        }
    </>);
};


export default UserEdit;