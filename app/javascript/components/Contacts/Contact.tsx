import React from "react";
import { useParams } from "react-router-dom";
import useGetResource from "../../hooks/useGetResource";
import ContactTable from "./ContactTable";
import Controls from "../Controls";
import { RESOURCE_TYPES } from "../../types/types";

// eslint-disable-next-line react/display-name
const Contact = React.memo(() => {
    const { slug } = useParams();
    const contact = useGetResource(parseInt(slug), RESOURCE_TYPES.CONTACT);

    return(<>
        {(contact) &&
            <>
                <Controls resource={contact}
                          resourceType={RESOURCE_TYPES.CONTACT}
                          />
                <h2>{contact.full_name}</h2>
                <ContactTable contact={contact}/>
            </>
        }

    </>);
});

export default Contact;

