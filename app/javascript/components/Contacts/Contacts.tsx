import React, { useContext } from "react";
import { TicketContext } from "../../packs/application";
import useGetPeople from "../../hooks/useGetPeople";
import ContactsTable from "./ContactsTable";
import LetterButtons from "../People/LetterButtons";
import { RESOURCE_TYPES } from "../../types/types";

// eslint-disable-next-line react/display-name
const Contacts =  React.memo(() => {
    const { contacts, isLoading } = useGetPeople(RESOURCE_TYPES.CONTACT);
    const { state } = useContext(TicketContext);
    const { contactPageInfo  } = state;

    return (<>
        <h2>Contacts</h2>
        <LetterButtons resourcePageInfo={contactPageInfo} resourceType={RESOURCE_TYPES.CONTACT}/>

        { (contacts && !isLoading ) &&
         <ContactsTable contacts={contacts}/>
        }
    </>);
});

export default Contacts;

