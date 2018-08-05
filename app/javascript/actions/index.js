export const REQUEST_TICKET = 'REQUEST_TICKET';
export const RECEIVE_TICKET = 'RECEIVE_TICKET';
export const RECEIVE_TICKET_FAILURE = 'RECEIVE_TICKET_FAILURE';
export const ADD_TICKET = 'ADD_TICKET';
export const UPDATE_TICKET = 'UPDATE_TICKET';
export const CHECK_LOGIN = 'CHECK_LOGIN';

//Multiple
export const REQUEST_TICKETS = 'REQUEST_TICKETS';
export const RECEIVE_TICKETS = 'RECEIVE_TICKETS';
export const RECEIVE_TICKETS_FAILURE = 'RECEIVE_TICKETS_FAILURE';

//User actions
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';


const SendMethod = {GET: 'GET', POST: 'POST', PUT: 'PUT'};

Object.freeze(SendMethod)


const createHeaders = (email = null, token = null) => {
  const myHeaders = new Headers();
  myHeaders.append('Accept', 'application/json');
  myHeaders.append('Content-Type', 'application/json');
  if (email && token) {
    myHeaders.append('X-User-Email', email);
    myHeaders.append('X-User-Token', token);
  }

  return myHeaders;
};

const doNetworkRequest = async (url, method, email = null, token = null, body = null) => {
  const myHeaders = createHeaders(email, token);
  const myInit = { method: method,
    headers: myHeaders
  };

  if (body) {
    myInit['body'] = body;
  }

  const myRequest = new Request(url, myInit);
  const response = await fetch(myRequest);
  if (response.ok) {
    const json = await response.json();
    return json;
  } else {
    throw response.statusText;
  }

};



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

export const requestLogin = () => {
  return {
    type: LOGIN_REQUEST,
    isFetching: true,
    isAuthenticated: false
  }
};

export const receiveLogin = (user) => {
  return {
    type: LOGIN_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    token: user.authentication_token,
    email: user.email

  }
};

export const loginError = (message) =>{
  return {
    type: LOGIN_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    message
  }
};



/*export const requireLogin = (nextState, replace) => {
  return dispatch => {
    dispatch(checkLogin());
    const {login} = store.getState();
    if (!login.isAuthenticated)
      replace('/login');

  }
};*/



const doLogin = async (username, password) => {

  return doNetworkRequest('/api/v1/users/sign_in',
      SendMethod.POST, null, null, `{"user":{"username":"${username}","password":"${password}"}}`);
};


export const login = (username, password) => {

  return async dispatch => {
    try {
      // wait for the fetch to finish then dispatch the result
      dispatch(requestLogin());
      const data = await doLogin(username, password);
      dispatch(receiveLogin(data));
    } catch (e) {
      // catch errors from fetch
      dispatch(loginError(e));
    }
  };
};


const fetchATicket = async (id, email, token) => {
  return doNetworkRequest(`/api/v1/tickets/${id}`, SendMethod.GET, email, token);
};

export const fetchTicket = (id, email, token) => {

return async dispatch => {
  try {
    // wait for the fetch to finish then dispatch the result
    dispatch(requestTicket());
    const data = await fetchATicket(id, email, token);
    dispatch(receiveTicket(data));
  } catch (e) {

    // catch errors from fetch
    dispatch(receiveTicketFailure(e));
  }
};
};


const fetchTheTickets = async (email, token) => {
  return doNetworkRequest(`/api/v1/tickets/`, SendMethod.GET, email, token);
};

export const fetchTickets = (email, token) => {

  return async dispatch => {
    try {
      // wait for the fetch to finish then dispatch the result
      dispatch(requestTicket());
      const data = await fetchTheTickets(email, token);
      dispatch(receiveTicket(data));
    } catch (e) {

      // catch errors from fetch
      dispatch(receiveTicketFailure(e));
    }
  };
};