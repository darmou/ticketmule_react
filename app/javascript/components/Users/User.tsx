import React from "react";
import { Link, useParams } from "react-router-dom";
import useGetResource from "../../hooks/useGetResource";
import UserTable from "./UserTable";
import { RESOURCE_TYPES } from "../../types/types";
import Controls from "../Controls";
import moment from "moment";
import { DeleteLink } from "../ComponentLibrary/StyledLinks";
import { ResourceItem} from "../ComponentLibrary/Resources";
import { deleteAlert, SLIDE_DURATION } from "../../utils/displayUtils";
import useSliderToggle from "react-slide-toggle-hooks";
import { H3ToggleStyled } from "../ComponentLibrary/H3ToggleStyled";
import useDeleteAlert from "../../hooks/useDeleteAlert";


// eslint-disable-next-line react/display-name
const User = React.memo(() => {
    const { slug } = useParams();
    const aUser = useGetResource(parseInt(slug), RESOURCE_TYPES.USER);
    const { deleteTheAlert } = useDeleteAlert();
    const { expandableRef, toggle, slideToggleState } =
        useSliderToggle({duration: SLIDE_DURATION});

    const removeAlert = async (alert) => {
        await deleteAlert(alert, deleteTheAlert);
    };

    const alertList = (aUser == null || aUser.alerts == null) ? null :
        aUser.alerts.map(alert => {
        return (
            <ResourceItem key={`alert_id_${alert.id}`}>
                <Link to={`/tickets/${alert.ticket_id}`}>Ticket #{alert.ticket_id}</Link> added on&nbsp;
                {moment(alert.created_at).format("DD MMM YYYY hh:mm A")}
                <DeleteLink to="" onClick={() => removeAlert(alert)}>Delete</DeleteLink>
            </ResourceItem>
        );
    });

    return(<>
        {(aUser) &&
            <>
                <Controls resource={aUser} resourceType={ RESOURCE_TYPES.USER }
                />
                <h2>{aUser.username}</h2>
                <UserTable aUser={aUser}/>
                {(alertList && alertList.length > 0) && <>
                    <H3ToggleStyled isOpen={slideToggleState.toggleState} onClick={toggle}>My Ticket Alerts</H3ToggleStyled>
                    <div ref={expandableRef} id="alerts">
                        {alertList}
                    </div>
                    </>

                }
            </>
        }
    </>);
});

export default User;

