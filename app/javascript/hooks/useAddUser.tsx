import { useContext } from "react";
import { useMutation } from "react-query";
import useTicketMule from "./useTicketMule";
import { TicketContext } from "../packs/application";
import ResourceStore from "../actions/resourceStore";
import { RESOURCE_TYPES, Result, User } from "../types/types";
import { useNavigate } from "react-router-dom";
import { createStandardSuccessMessage, createStandardErrorMessage } from "../components/ComponentLibrary/FlashMessages";
import { queryClient } from "../utils/network";

const useAddUser = (isAdminForm = false) => {
    const ticketMule = useTicketMule();
    const navigate = useNavigate();
    const { state, dispatch } = useContext(TicketContext);

    const {mutate:addTheUser} = useMutation(
        ticketMule.addUser.bind(this, state),

        {
            onSuccess: async (user: User) => {
                dispatch({
                    action_fn: ResourceStore.setFlashMsg,
                    flashMsg: createStandardSuccessMessage(`${user.username} was successfully created!`)});

                queryClient.removeQueries("users", { exact: true });
                dispatch({action_fn: ResourceStore.add, resource: user, resourceType: RESOURCE_TYPES.USER});
                if (isAdminForm) {
                    navigate('/admin/');
                } else {
                    navigate(`/users/user/${user.id}`);
                }
            },
            onError: async (result: Result) => {
                dispatch({
                    action_fn: ResourceStore.setFlashMsg,
                    flashMsg: createStandardErrorMessage(result.response.data.message)});
            }
        }
    );

    return { addTheUser };
};

export default useAddUser;