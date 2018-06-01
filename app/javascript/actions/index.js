export const REQUEST_TICKET = 'REQUEST_TICKET';
export const RECEIVE_TICKET = 'RECEIVE_TICKET';
export const RECEIVE_TICKET_FAILURE = 'RECEIVE_TICKET_FAILURE';
//Multiple
export const REQUEST_TICKETS = 'REQUEST_TICKETS';
export const RECEIVE_TICKETS = 'RECEIVE_TICKETS';
export const RECEIVE_TICKETS_FAILURE = 'RECEIVE_TICKETS_FAILURE';

export const ADD_TICKET = 'ADD_TICKET';
export const UPDATE_TICKET = 'UPDATE_TICKET';


export const requestTicket = () => {
  return {
    type: REQUEST_TICKET
  }
};

export const receiveTicket = (ticket) => {
  return {
    type: RECEIVE_TICKET,
    ticket: ticket,
    receivedAt: Date.now()
  }
};

export const receiveTicketFailure = (error) => {
  return {
    type: RECEIVE_TICKET_FAILURE,
    error: error,
    receivedAt: Date.now()
  }
};

export const requestTickets = () => {
  return {
    type: REQUEST_TICKETS
  }
};

export const receiveTickets = (tickets) => {
  return {
    type: RECEIVE_TICKETS,
    tickets: tickets,
    receivedAt: Date.now()
  }
};

export const receiveTicketsFailure = (error) => {
  return {
    type: RECEIVE_TICKETS_FAILURE,
    error: error,
    receivedAt: Date.now()
  }
};