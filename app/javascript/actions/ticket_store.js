import produce from "immer";


function TicketStore(){}
TicketStore.add = ({state, ticket}) => {
    return {...state, tickets: [...state.tickets, ticket]};
};


TicketStore.update =  ({state, index, ticket}) => {
    return produce(state, draftState => {
        draftState.tickets[index] = {...draftState.tickets[index], ...ticket};
    });
};

TicketStore.setTickets = ({state, tickets}) => {
    return produce(state, draftState => {
        draftState.tickets = tickets;
    });
};

TicketStore.setTicket = ({state, ticket}) => {
    return produce(state, draftState => {
        draftState.ticket = ticket;
    });
};

TicketStore.delete = ({state, index}) => {
    return produce(state, draftState => {
        draftState.tickets.splice(index, 1);
    });
};

TicketStore.setUser = ({state, user}) => {
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
};

export default TicketStore;