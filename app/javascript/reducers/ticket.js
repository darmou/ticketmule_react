import {
  RECEIVE_TICKET,
  REQUEST_TICKET
} from "../actions";


const ticket = (state = null, action) => {
  switch (action.type) {


    case RECEIVE_TICKET:
      return {...state, isFetching: true };

    case REQUEST_TICKET:
      return {...state,
        isFetching: false,
        id: action.ticket.id,
        text: action.ticket.ticket || action.ticket.text,
        priority: action.ticket.priority || '',
        lastUpdated: action.receivedAt
      };

    default:
      return state
  }
}

export default ticket;