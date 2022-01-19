import axios from "axios";
import { QueryClient } from "react-query";

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: Infinity,
        },
    },
});


const createHeaders = (user, isAttachment) => {
    const myHeaders = {};
    myHeaders['Accept'] = 'application/json';
    myHeaders['Content-Type'] = (isAttachment) ? 'multipart/form-data' :'application/json';
    if (user != null) {
        myHeaders['X-User-Email'] = user.email;
        myHeaders['X-User-Token'] = user.authentication_token;
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
};

export const doNetworkRequest = async (url, method, user, data = null,
                                       isAttachment = false) => {
    const myHeaders = createHeaders(user, isAttachment);
    const requestConfig = { method,
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






