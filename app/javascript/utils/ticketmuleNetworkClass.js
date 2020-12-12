import { doNetworkRequest, getPlural, getId, SendMethod } from "./network";

class TicketmuleNetwork {
    constructor(user) {
        this.prefix = '/api/v1';
        this.user = user;
    }

    async fetchTicket(id, isPdf = false) {
        // wait for the fetch to finish then dispatch the result
        if (this.user) {
            const pdf = (isPdf) ? '.pdf' : '';
            return await doNetworkRequest(`${this.prefix}/tickets/${id}${pdf}`, SendMethod.GET, this.user.email,
                this.user.authentication_token);
        }
    }

    async fetchResource(id, type) {
        // wait for the fetch to finish then dispatch the result
        if (this.user) {
            return await doNetworkRequest(`${this.prefix}/${type}/${id}`, SendMethod.GET, this.user.email,
                this.user.authentication_token);
        }
    }

    async updateResource(appState, type, data) {
        if (appState.user) {
            const id = getId(appState, type);

            return await doNetworkRequest(`/api/v1/${type}s/${id}`,
                SendMethod.PATCH, appState.user.email, appState.user.authentication_token,
                data);
        }
    }

    async deleteResource(appState, type) {
        const id = getId(appState, type);
        if (appState.user && id != null) {
            return await doNetworkRequest(`/api/v1/${type}s/${id}`,
                SendMethod.DELETE, appState.user.email, appState.user.authentication_token);
        }
    }

    async fetchResources (page, perPage, letterSelected, type)  {
        if (this.user) {
            // wait for the fetch to finish then dispatch the result
            const letterFilter = (letterSelected == null) ? "" : `&letter=${letterSelected}`;
            return await doNetworkRequest(`${this.prefix}/${type}s/?page=${page}&perPage=${perPage}${letterFilter}`, SendMethod.GET, this.user.email,
                this.user.authentication_token);
        };
    }

    async addResource(appState, type, data) {
        if (appState.user) {
            return await doNetworkRequest(`/api/v1/${type}/`,
                SendMethod.POST, appState.user.email, appState.user.authentication_token,
                data);
        }
    }

    async toggleEnableContact(appState, contactId) {
        if (appState.user) {
            return await doNetworkRequest(`/api/v1/contacts/${contactId}/toggle_enable`,
                SendMethod.POST, appState.user.email, appState.user.authentication_token,
                {});
        }
    }

    async toggleEnableOption(appState, type, optionId) {
        if (appState.user) {
            return await doNetworkRequest(`/api/v1/options/${optionId}/toggle_enable`,
                SendMethod.POST, appState.user.email, appState.user.authentication_token,
                { option: { type } });
        }
    }

    async addOption(appState, type, option) {
        debugger;
        const plural = getPlural(type);
        if (appState.user) {
            return await doNetworkRequest(`/api/v1/${plural}/`,
                SendMethod.POST, appState.user.email, appState.user.authentication_token,
                { [type] : option });
        }
    }

    async fetchOptions(shouldFetchPeople) {
        if (this.user) {
            // wait for the fetch to finish then dispatch the result
            const fetchPeopleQuery = (shouldFetchPeople) ? '?fetchPeople=true' : '';
            return await doNetworkRequest(`${this.prefix}/options${fetchPeopleQuery}`, SendMethod.GET, this.user.email,
                this.user.authentication_token);
        }
    }

    async deleteRelatedTicketRecord(app_state, type, id) {
        if (app_state.user && id != null && app_state.ticket.id != null) {
            return await doNetworkRequest(`/api/v1/tickets/${app_state.ticket.id}/${type}/${id}`,
                SendMethod.DELETE, app_state.user.email,
                app_state.user.authentication_token);
        }
    }

    async addRelatedTicketRecord(appState, type, data) {
        if (appState.user) {
            return await doNetworkRequest(`/api/v1/tickets/${appState.ticket.id}/${type}`,
                SendMethod.POST, appState.user.email, appState.user.authentication_token,
                data, type === "attachments");
        }
    }

    async login({username, password}) {
        return await doNetworkRequest(`/api/v1/users/sign_in`,
            SendMethod.POST, null, null,
            `{"user":{"username":"${username}","password":"${password}"}}`);
    }

    async logout() {
        return await doNetworkRequest(`${this.prefix}/users/sign_out`,
            SendMethod.DELETE);
    }
}

export default TicketmuleNetwork;