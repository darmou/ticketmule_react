import axios from "axios";
import {RESOURCE_TYPES} from "./types";

export const SendMethod = { GET: 'GET', POST: 'POST', PATCH: 'PATCH', PUT: 'PUT', DELETE: 'DELETE' };
Object.freeze(SendMethod);

const createHeaders = (email,token, isAttachment) => {
    const myHeaders = {};
    myHeaders['Accept'] = 'application/json';
    myHeaders['Content-Type'] = (isAttachment) ? 'multipart/form-data' :'application/json';
    if (email && token) {
        myHeaders['X-User-Email'] = email;
        myHeaders['X-User-Token'] = token;
    }

    return myHeaders;
};

export const getPlural = (type) => {
    switch (type) {
        case "priority":
            return "priorities";
        case "status":
            return "statuses";
        default:
            return `${type}s`;
    }
}

export const getId = (appState, type) => {
    const { ticket, contact, aUser } = appState;
    switch (type) {
        case RESOURCE_TYPES.TICKET:
            return ticket.id;
        case RESOURCE_TYPES.CONTACT:
            return contact.id;
        case RESOURCE_TYPES.USER:
            return aUser.id;
    }
};

export const doNetworkRequest = async (url, method, email = null, token = null, data = null,
                                       isAttachment = false) => {
    const myHeaders = createHeaders(email, token, isAttachment);
    const requestConfig = { method: method,
        headers: myHeaders,
        url,
    };

    if (url.indexOf(".pdf") > -1) {
        requestConfig["responseType"] = "arraybuffer";
    }

    if (data) {
        requestConfig["data"] = data;
    }

    //const myRequest = new Request(url, myInit);
    const response = await axios.request(requestConfig);

    if (response.status === 200 || response.status === 201) {
        return response.data;
    } else {
        throw response.statusText;
    }
};






