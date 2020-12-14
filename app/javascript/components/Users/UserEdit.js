import React, { useContext } from "react";
import {useNavigate, useParams} from "react-router-dom";
import UserForm from "./UserForm";
import { PropTypes } from "prop-types";
import {queryCache, useMutation} from "react-query";
import useTicketmule from "../../hooks/useTicketMule";
import UserStore from "../../actions/userStore";
import useGetUser from "../../hooks/useGetUser";
import { TicketContext } from "../../packs/application";
import { RESOURCE_TYPES } from "../../utils/types";
import {SuccessNotificationStyled} from "../ComponentLibrary/FlashMessages";
import EnableIcon from "../../images/accept.png";

const UserEdit = ({setFlashMsg}) => {
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
                setFlashMsg(<SuccessNotificationStyled><img src={`${EnableIcon}`} /> {user.username} was successfully edited! </SuccessNotificationStyled>);

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

UserEdit.propTypes = {
    setFlashMsg: PropTypes.func
};

export default UserEdit;