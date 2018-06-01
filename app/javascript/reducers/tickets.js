import {
  RECEIVE_TICKETS,
  REQUEST_TICKETS
} from "../actions";


const tickets = (state = null, action) => {
  switch (action.type) {


    case RECEIVE_TICKETS:
      return {...state, isFetching: true };

    case REQUEST_TICKETS:
      return {...state,
        isFetching: false,
        tickets: action.tickets,
        lastUpdated: action.receivedAt
      };

    default:
      return state
  }
}

export default tickets;