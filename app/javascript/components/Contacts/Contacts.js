import React, { useContext } from "react";
import { TicketContext } from "../../packs/application";
import ResourceStyled from "../ComponentLibrary/ResourceStyled";
import useGetPeople from "../../hooks/useGetPeople";
import ContactsTable from "../Contacts/ContactsTable";
import LetterButtons from "../People/LetterButtons";
import { RESOURCE_TYPES } from "../../utils/types";

// eslint-disable-next-line react/display-name
const Contacts =  React.memo(() => {
    const { contacts, isLoading } = useGetPeople(RESOURCE_TYPES.CONTACT);
    const { state } = useContext(TicketContext);
    const { contactPageInfo  } = state;

    return (<ResourceStyled>
        <h2>Contacts</h2>
        <LetterButtons resourcePageInfo={contactPageInfo} />

        { (contacts && !isLoading ) &&
         <ContactsTable contacts={contacts}/>
        }
    </ResourceStyled>);
});

export default Contacts;

