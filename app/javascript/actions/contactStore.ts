import produce from "immer";
import { State } from "../types/types";

interface ContactProps  {
    state: State,
    page: number
}

const ContactStore = {
    add: function ({state, contact}) {
        return {...state, contacts: [...state.contacts, contact]};
    },
    update: function ({state, aContact}) {
        if (state && state.contacts) {
            const index = state.contacts.findIndex(contact => contact.id === aContact.id);
            return produce(state, draftState => {
                draftState.contacts[index] = {...draftState.contacts[index], ...aContact};
            });
        }
        return state;
    },
    setContactPage: function ({state, page}: ContactProps) {
        return produce(state, draftState => {
            draftState.contactPageInfo.currentPage = page;
        });
    },
    setContactLetterSelected: function ({state, letter}) {
      return produce(state, draftState => {
          draftState.contactPageInfo.letterSelected = letter;
        });
    },
    setContactsData: function ({state, contactsData}) {
        return produce(state, draftState => {
            draftState.contactPageInfo.currentPage = contactsData['pagy']['page'];
            draftState.contactPageInfo.resourceCount = contactsData['pagy']['count'];
            draftState.contactPageInfo.lastPage = contactsData['pagy']['last'];
            draftState.contacts = contactsData['data'];
        });
    },
    setContact: function ({state, contact}) {
        return produce(state, draftState => {
            draftState.contact = contact;
        });
    },
};

export default ContactStore;