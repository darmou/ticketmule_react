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
    update: function ({state, index, ticket}) {
        return produce(state, draftState => {
            draftState.tickets[index] = {...draftState.tickets[index], ...ticket};
        });
    },
    setTickets: function ({state, tickets, type}) {
        return produce(state, draftState => {
            draftState.tickets[type] = tickets;
        });
    },
    setTicket: function ({state, ticket}) {
        return produce(state, draftState => {
            draftState.ticket = ticket;
        });
    },
    delete: function ({state, index}) {
        return produce(state, draftState => {
            draftState.tickets.splice(index, 1);
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