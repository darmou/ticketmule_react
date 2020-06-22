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

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';
export const LOGOUT_RESET = 'LOGOUT_RESET';

const SendMethod = { GET: 'GET', POST: 'POST', PUT: 'PUT', DELETE: 'DELETE' };

Object.freeze(SendMethod);


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
    const json = (response.status === 204) ? {} : await response.json();
    return json;
  } else {
    throw response.statusText;
  }
};

export const requestTicket = () => {
  return {
    type: REQUEST_TICKET
  };
};

export const receiveTicket = (ticket) => {
  return {
    type: RECEIVE_TICKET,
    ticket: ticket,
    receivedAt: Date.now()
  };
};

export const receiveTicketFailure = (error) => {
  return {
    type: RECEIVE_TICKET_FAILURE,
    error: error,
    receivedAt: Date.now()
  };
};

export const requestTickets = () => {
  return {
    type: REQUEST_TICKETS
  };
};

export const receiveTickets = (tickets) => {
  return {
    type: RECEIVE_TICKETS,
    tickets: tickets,
    receivedAt: Date.now()
  };
};

export const receiveTicketsFailure = (error) => {
  return {
    type: RECEIVE_TICKETS_FAILURE,
    error: error,
    receivedAt: Date.now()
  };
};

export const requestLogin = () => {
  return {
    type: LOGIN_REQUEST,
    isFetching: true,
    isAuthenticated: false
  };
};

export const requestLogout = () => {
    return {
        type: LOGOUT_REQUEST,
        isLoggingOut: true,
        isAuthenticated: true
    };
};

export const receiveLogout = () => {
    return {
        type: LOGOUT_SUCCESS,
        isLoggingOut: false,
        isAuthenticated: false,
        user: null
    };
};

export const logoutError = (message) => {
    return {
        type: LOGOUT_FAILURE,
        isFetching: false,
        isAuthenticated: false,
        message
    };
};

export const receiveLogin = (user) => {
  return {
    type: LOGIN_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    user,
  };
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

const doLogout = async () => {
    return doNetworkRequest('/api/v1/users/sign_out',
        SendMethod.DELETE);
};

export const logout = async (dispatch) => {
    try {
        dispatch(requestLogout());
        await doLogout();
        dispatch(receiveLogout());
    } catch (e) {
        // catch errors from delete request
        dispatch(logoutError(e));
    }
};

export const login = async (username, password, dispatch) => {
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

export const fetchTicket = async (id, email, token, dispatch) => {
    try {
        // wait for the fetch to finish then dispatch the result
        dispatch(requestTicket());
        const data = await doNetworkRequest(`/api/v1/tickets/${id}`, SendMethod.GET, email, token);
        dispatch(receiveTicket(data));
    } catch (e) {
        // catch errors from fetch
        dispatch(receiveTicketFailure(e));
    }
};

export const fetchTickets = async (email, token, dispatch) => {
    try {
      // wait for the fetch to finish then dispatch the result
      dispatch(requestTickets());
      const data = await doNetworkRequest(`/api/v1/tickets/`, SendMethod.GET, email, token);

      dispatch(receiveTickets(data));
    } catch (e) {

      // catch errors from fetch
      dispatch(receiveTicketFailure(e));
    }
};