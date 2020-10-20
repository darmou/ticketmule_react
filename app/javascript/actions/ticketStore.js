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
    setTickets: function ({state, tickets}) {
        return produce(state, draftState => {
            draftState.tickets = tickets;
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
    resetIsLoggingOut: function ({state}) {
        return produce(state, draftState => {
            draftState.isLoggingOut = false;
        });
    },
    setUser: function ({state, user}) {
        if (user) {
            sessionStorage.setItem("authentication_token", user.authentication_token);
            sessionStorage.setItem("email", user.email);
            sessionStorage.setItem("username", user.username);
        } else {
            sessionStorage.removeItem("authentication_token");
            sessionStorage.removeItem("email");
            sessionStorage.removeItem("username");
        }
        return produce(state, draftState => {
            draftState.isLoggingOut = (user == null) ? true : false;
            draftState.user = user;
        });
    }
};

export default TicketStore;