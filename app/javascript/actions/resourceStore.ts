import produce from "immer";
import { getQueryKey } from "../utils/displayUtils";
import { RESOURCE_TYPES, State, User, Ticket, Contact } from "../types/types";

interface ResourceProps  {
    state: State,
    page?: number,
    perPage?: number,
    letter?: string,
    id?: number,
    resourceType?: RESOURCE_TYPES,
    resource?: User | Ticket | Contact,
    flashMsg?: string
}

const ResourceStore = {
    add: function ({state, resource, resourceType}: ResourceProps) {
        return {...state, [`${resourceType}s`]: [...state[`${resourceType}s`], resource]};
    },
    update: function ({state, resource, resourceType}: ResourceProps) {
        if (state && state[`${resourceType}s`]) {
            const index = state[`${resourceType}s`].findIndex(aResource => resource.id === aResource.id);
            return produce(state, draftState => {
                draftState[`${resourceType}s`][index] = {...draftState[`${resourceType}s`][index], ...resource};
            });
        }
        return state;
    },
    setResourcePage: function ({state, page, resourceType}: ResourceProps) {
        return produce(state, draftState => {
            draftState[`${resourceType}PageInfo`].currentPage = page;
        });
    },
    setFlashMsg: function ({state, flashMsg}: ResourceProps) {
        return produce(state, draftState => {
            draftState.flashMsg = flashMsg;
        });
    },
    setResourceLetterSelected: function ({state, letter, resourceType}: ResourceProps) {
        return produce(state, draftState => {
            draftState[`${resourceType}PageInfo`].letterSelected = letter;
        });
    },
    setPerPage: function ({state, perPage, resourceType}: ResourceProps) {
        return produce(state, draftState => {
            draftState[`${resourceType}PageInfo`].perPage = perPage;
        });
    },
    setPageData: function ({state, resourceType, pageData}) {
        return produce(state, draftState => {
            draftState[`${resourceType}PageInfo`].currentPage = pageData['pagy']['page'];
            draftState[`${resourceType}PageInfo`].resourceCount = pageData['pagy']['count'];
            draftState[`${resourceType}PageInfo`].lastPage = pageData['pagy']['last'];
            draftState[`${resourceType}s`] = pageData['data'];
        });
    },
    setSearchString: function ({state, searchStr, resourceType}) {
        return produce(state, draftState => {
            draftState[`${resourceType}PageInfo`].searchString = searchStr;
        });
    },
    setOptions: function ({state, options}) {
        return produce(state, draftState => {
            draftState.options = options;
        });
    },
    setResource: function ({state, resource, resourceType}: ResourceProps) {
        const queryKey = getQueryKey(resourceType);
        return produce(state, draftState => {
            draftState[queryKey] = resource;
        });
    },
    deleteResource: function ({state, id, resourceType}: ResourceProps) {
        const index = state[`${resourceType}s`].findIndex(resource => resource.id === id);
        return produce(state, draftState => {
            draftState[`${resourceType}s`].splice(index, 1);
        });
    },

};

export default ResourceStore;