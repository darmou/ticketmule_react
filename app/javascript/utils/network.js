import axios from "axios";

const SendMethod = { GET: 'GET', POST: 'POST', PUT: 'PUT', DELETE: 'DELETE' };
Object.freeze(SendMethod);

const createHeaders = (email = null, token = null) => {
    const myHeaders = {};
    myHeaders['Accept'] = 'application/json';
    myHeaders['Content-Type'] = 'application/json';
    if (email && token) {
        myHeaders['X-User-Email'] = email;
        myHeaders['X-User-Token'] = token;
    }

    return myHeaders;
};

const doNetworkRequest = async (url, method, email = null, token = null, data = null) => {
    const myHeaders = createHeaders(email, token);
    const requestConfig = { method: method,
        headers: myHeaders,
        url,
    };

    if (data) {
        requestConfig['data'] = data;
    }

    //const myRequest = new Request(url, myInit);
    const response = await axios.request(requestConfig);

    if (response.status === 200 || response.status === 201) {
        return response.data;
    } else {
        throw response.statusText;
    }
};


export const login = async (username, password) => {

    return doNetworkRequest('/api/v1/users/sign_in',
        SendMethod.POST, null, null, `{"user":{"username":"${username}","password":"${password}"}}`);
};

export const logout = async () => {
    return doNetworkRequest('/api/v1/users/sign_out',
        SendMethod.DELETE);
};



export const fetchTicket = async (id, email, token) => {
    try {
        // wait for the fetch to finish then dispatch the result
        return await doNetworkRequest(`/api/v1/tickets/${id}`, SendMethod.GET, email, token);
    } catch (e) {
        // catch errors from fetch
        console.log(e);
    }
};

export const fetchTickets = async (user) => {
    try {
        // wait for the fetch to finish then dispatch the result
        return await doNetworkRequest(`/api/v1/tickets/`, SendMethod.GET, user.email, user.authentication_token);

    } catch (e) {
        console.log(e);
        // catch errors from fetch
       // dispatch(receiveTicketFailure(e));
    }
};