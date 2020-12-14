import React from "react";
import { useParams } from "react-router-dom";
import useGetContact from "../../hooks/useGetContact";
import ContactTable from "./ContactTable";
import Controls from "../Controls";
import { RESOURCE_TYPES } from "../../utils/types";

// eslint-disable-next-line react/display-name
const Contact = React.memo(() => {
    const { slug } = useParams();
    const contact = useGetContact(slug);

    return(<>
        {(contact) &&
            <>
                <Controls id={slug}
                          resource={contact}
                          resourceType={RESOURCE_TYPES.CONTACT}
                          />
                <h2>{contact.full_name}</h2>
                <ContactTable contact={contact}/>
            </>
        }

    </>);
});

export default Contact;

