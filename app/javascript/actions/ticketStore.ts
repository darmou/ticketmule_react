import produce from "immer";

export const ticketsTypes = {
    NOT_CLOSED: "NOT_CLOSED",
    CLOSED: "CLOSED"
};
Object.freeze(ticketsTypes);

const TicketStore = {
    add: function ({state, ticket}) {
        return {...state, tickets: [...state.tickets, ticket]};
    },
    update: function ({state, aTicket}) {
        if (state && state.tickets) {
            const index = state.tickets.findIndex(ticket => ticket.id === aTicket.id);
            return produce(state, draftState => {
                draftState.tickets[index] = {...draftState.tickets[index], ...aTicket};
            });
        }
        return state;
    },
    setTicketPage: function ({state, page}) {
        return produce(state, draftState => {
            draftState.ticketPageInfo.currentPage = page;
        });
    },
    setFlashMsg: function ({state, flashMsg}) {
        return produce(state, draftState => {
            draftState.flashMsg = flashMsg;
        });
    },
    setPerPage: function ({state, perPage}) {
        return produce(state, draftState => {
            draftState.ticketPageInfo.perPage = perPage;
        });
    },
    setPageData: function ({state, pageInfoType, type, pageData}) {
        return produce(state, draftState => {
            draftState[pageInfoType].currentPage = pageData['pagy']['page'];
            draftState[pageInfoType].resourceCount = pageData['pagy']['count'];
            draftState[pageInfoType].lastPage = pageData['pagy']['last'];
            draftState[type] = pageData['data'];
        });
    },
    setSearchString: function ({state, searchStr}) {
        return produce(state, draftState => {
            draftState.ticketPageInfo.searchString = searchStr;
        });
    },
    setOptions: function ({state, options}) {
        return produce(state, draftState => {
            draftState.options = options;
        });
    },
    setTicket: function ({state, ticket}) {
        return produce(state, draftState => {
            draftState.ticket = ticket;
        });
    },
    deleteTicket: function ({state, id}) {
        const index = state.tickets.findIndex(ticket => ticket.id === id);
        return produce(state, draftState => {
            draftState.tickets.splice(index, 1);
        });
    },

};

export default TicketStore;