import React from "react";
import { useParams } from "react-router-dom";
import useGetUser from "../../hooks/useGetUser";
import UserTable from "./UserTable";
import { RESOURCE_TYPES } from "../../utils/types";
import Controls from "../Controls";

// eslint-disable-next-line react/display-name
const User = React.memo(() => {
    const { slug } = useParams();
    const aUser = useGetUser(slug);

    return(<>
        {(aUser) &&
            <>
                <Controls id={slug}
                          resource={aUser} resourceType={ RESOURCE_TYPES.USER }
                />
                <h2>{aUser.username}</h2>
                <UserTable aUser={aUser}/>
            </>
        }

    </>);
});

export default User;

