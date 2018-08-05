import { combineReducers } from 'redux';
import tickets from './tickets';
import ticket from './ticket';
import user from './user';

export default combineReducers({
  tickets: tickets, ticket: ticket, user: user
});

