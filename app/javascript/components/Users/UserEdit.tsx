import React, {useContext} from "react";
import { useNavigate, useParams } from "react-router-dom";
import UserForm from "./UserForm";
import { useMutation } from "react-query";
import useTicketmule from "../../hooks/useTicketMule";
import useGetResource from "../../hooks/useGetResource";
import { TicketContext } from "../../packs/application";
import { RESOURCE_TYPES, User } from "../../types/types";
import { createStandardSuccessMessage } from "../ComponentLibrary/FlashMessages";
import ResourceStore from "../../actions/resourceStore";
import { queryClient } from "../../utils/network";

const UserEdit = () => {
    const { state, dispatch } = useContext(TicketContext);
    const { user } = state;
    const { slug } = useParams();
    const aUser = useGetResource(parseInt(slug), RESOURCE_TYPES.USER);
    const navigate = useNavigate();

    const ticketMule = useTicketmule();
    const { mutate: editTheUser} = useMutation(
        ticketMule.updateResource.bind(this, state, RESOURCE_TYPES.USER, parseInt(slug)),
        {
            onSuccess: async (theUser: User) => {
                dispatch({
                    action_fn: ResourceStore.setFlashMsg,
                    flashMsg: createStandardSuccessMessage(`${theUser.username} was successfully edited!`)});

                dispatch({action_fn: ResourceStore.setResource, user, resourceType: RESOURCE_TYPES.USER});
                // Query Invalidations
                queryClient.removeQueries("AUser", { exact: true });
                navigate(`/users/${theUser.id}`);
            },
        }
    );

    return (<>
        {(aUser && user) &&
            <>
        <h2>Edit {aUser.username}</h2>
            <UserForm formAction={editTheUser} slug={slug} aUser={aUser} />
            </>
        }
    </>);
};


export default UserEdit;