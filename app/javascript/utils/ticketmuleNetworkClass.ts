import { doNetworkRequest, getPlural } from "./network";
import { SEND_METHOD, State } from "../types/types";

class TicketmuleNetwork {
    // eslint-disable-next-line
    private readonly prefix: string;
    private readonly user: any;

    constructor(user) {
        this.prefix = '/api/v1';
        this.user = user;
    }

    async fetchTicket(id, isPdf = false) {
        // wait for the fetch to finish then dispatch the result
        if (this.user) {
            const pdf = (isPdf) ? '.pdf' : '';
            return await doNetworkRequest(`${this.prefix}/tickets/${id}${pdf}`, SEND_METHOD.GET, this.user);
        }
    }

    async fetchResource(id, type) {
        // wait for the fetch to finish then dispatch the result
        if (this.user) {
            return await doNetworkRequest(`${this.prefix}/${type}/${id}`, SEND_METHOD.GET, this.user);
        }
    }

    async forgot(user) {
        return await doNetworkRequest(`/api/v1/users/password`, SEND_METHOD.POST, null, { user });
    }

    async reset_password(reset_password_token, password) {
        return await doNetworkRequest(`/api/v1/users/password`, SEND_METHOD.PATCH, null,
            { user: { password, reset_password_token }});
    }

    async updateResource(appState, resourceType, id, data) {
        if (appState.user) {
            return await doNetworkRequest(`/api/v1/${resourceType}s/${id}`, SEND_METHOD.PATCH, appState.user, data);
        }
    }

    async deleteResource(appState, resourceType, id) {
        if (appState.user && id != null) {
            return await doNetworkRequest(`/api/v1/${resourceType}s/${id}`,
                SEND_METHOD.DELETE, appState.user);
        }
    }

    async fetchResources (page, perPage, letterSelected, type, searchStr = "")  {
        if (this.user) {
            // wait for the fetch to finish then dispatch the result
            const letterFilter = (letterSelected == null) ? "" : `&letter=${letterSelected}`;
            return await doNetworkRequest(`${this.prefix}/${type}s/?page=${page}&perPage=${perPage}${letterFilter}${searchStr}`,
                SEND_METHOD.GET, this.user);
        }
    }

    async addResource(appState, type, data) {
        if (appState.user) {
            return await doNetworkRequest(`/api/v1/${type}/`,
                SEND_METHOD.POST, appState.user, data);
        }
    }

    async toggleEnableContact(appState, contactId) {
        if (appState.user) {
            return await doNetworkRequest(`/api/v1/contacts/${contactId}/toggle_enable`,
                SEND_METHOD.POST, appState.user, {});
        }
    }

    async toggleEnableOption(appState, type, optionId) {
        if (appState.user) {
            return await doNetworkRequest(`/api/v1/options/${optionId}/toggle_enable`,
                SEND_METHOD.POST, appState.user,
                { option: { type } });
        }
    }

    async addOption(appState, type, option) {
        const plural = getPlural(type);
        if (appState.user) {
            return await doNetworkRequest(`/api/v1/${plural}/`,
                SEND_METHOD.POST, appState.user, { [type] : option });
        }
    }

    async addUser(appState, user) {
        if (appState.user) {
            return await doNetworkRequest(`/api/v1/users/`,
                SEND_METHOD.POST, appState.user, { user });
        }
    }

    async fetchOptions(shouldFetchPeople) {
        if (this.user) {
            // wait for the fetch to finish then dispatch the result
            const fetchPeopleQuery = (shouldFetchPeople) ? '?fetchPeople=true' : '';
            return await doNetworkRequest(`${this.prefix}/options${fetchPeopleQuery}`, SEND_METHOD.GET, this.user);
        }
    }

    async deleteRelatedTicketRecord(app_state: State, type: string, ticketId: number, id: number, alert = null) {
        const aTicketId =  (alert == null) ? ticketId : alert.ticket_id;
        if (id == null && alert) {
            id = alert.id;
        }

        if (app_state.user && id != null && aTicketId != null) {
            return await doNetworkRequest(`/api/v1/tickets/${aTicketId}/${type}/${id}`,
                SEND_METHOD.DELETE, app_state.user);
        }
    }

    async addRelatedTicketRecord(appState, type, id, data) {
        if (appState.user) {
            return await doNetworkRequest(`/api/v1/tickets/${id}/${type}`,
                SEND_METHOD.POST, appState.user, data, type === "attachments");
        }
    }

    async login({username, password}) {
        return await doNetworkRequest(`/api/v1/users/sign_in`, SEND_METHOD.POST,
            null, `{"user":{"username":"${username}","password":"${password}"}}`);
    }
}

export default TicketmuleNetwork;