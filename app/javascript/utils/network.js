import axios from "axios";

export const SendMethod = { GET: 'GET', POST: 'POST', PUT: 'PUT', DELETE: 'DELETE' };
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

export const doNetworkRequest = async (url, method, email = null, token = null, data = null) => {
    const myHeaders = createHeaders(email, token);
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






