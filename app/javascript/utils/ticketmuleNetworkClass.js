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
            return await doNetworkRequest(`${this.prefix}/tickets/${id}${pdf}`, SendMethod.GET, this.user);
        }
    }

    async fetchResource(id, type) {
        // wait for the fetch to finish then dispatch the result
        if (this.user) {
            return await doNetworkRequest(`${this.prefix}/${type}/${id}`, SendMethod.GET, this.user);
        }
    }

    async updateResource(appState, type, data) {
        if (appState.user) {
            const id = getId(appState, type);

            return await doNetworkRequest(`/api/v1/${type}s/${id}`, SendMethod.PATCH, appState.user, data);
        }
    }

    async deleteResource(appState, type) {
        const id = getId(appState, type);
        if (appState.user && id != null) {
            return await doNetworkRequest(`/api/v1/${type}s/${id}`,
                SendMethod.DELETE, appState.user);
        }
    }

    async fetchResources (page, perPage, letterSelected, type)  {
        if (this.user) {
            // wait for the fetch to finish then dispatch the result
            const letterFilter = (letterSelected == null) ? "" : `&letter=${letterSelected}`;
            return await doNetworkRequest(`${this.prefix}/${type}s/?page=${page}&perPage=${perPage}${letterFilter}`,
                SendMethod.GET, this.user);
        };
    }

    async addResource(appState, type, data) {
        if (appState.user) {
            return await doNetworkRequest(`/api/v1/${type}/`,
                SendMethod.POST, appState.user, data);
        }
    }

    async toggleEnableContact(appState, contactId) {
        if (appState.user) {
            return await doNetworkRequest(`/api/v1/contacts/${contactId}/toggle_enable`,
                SendMethod.POST, appState.user, {});
        }
    }

    async toggleEnableOption(appState, type, optionId) {
        if (appState.user) {
            return await doNetworkRequest(`/api/v1/options/${optionId}/toggle_enable`,
                SendMethod.POST, appState.user,
                { option: { type } });
        }
    }

    async addOption(appState, type, option) {
        const plural = getPlural(type);
        if (appState.user) {
            return await doNetworkRequest(`/api/v1/${plural}/`,
                SendMethod.POST, appState.user, { [type] : option });
        }
    }

    async addUser(appState, user) {
        if (appState.user) {
            return await doNetworkRequest(`/api/v1/users/`,
                SendMethod.POST, appState.user, { user });
        }
    }

    async fetchOptions(shouldFetchPeople) {
        if (this.user) {
            // wait for the fetch to finish then dispatch the result
            const fetchPeopleQuery = (shouldFetchPeople) ? '?fetchPeople=true' : '';
            return await doNetworkRequest(`${this.prefix}/options${fetchPeopleQuery}`, SendMethod.GET, this.user);
        }
    }

    async deleteRelatedTicketRecord(app_state, type, id, alert = null) {
        const aTicketId =  (alert == null) ? app_state.ticket.id : alert.ticket_id;
        if (id == null && alert) {
            id = alert.id;
        }

        if (app_state.user && id != null && aTicketId != null) {
            return await doNetworkRequest(`/api/v1/tickets/${aTicketId}/${type}/${id}`,
                SendMethod.DELETE, app_state.user);
        }
    }

    async addRelatedTicketRecord(appState, type, data) {
        if (appState.user) {
            return await doNetworkRequest(`/api/v1/tickets/${appState.ticket.id}/${type}`,
                SendMethod.POST, appState.user, data, type === "attachments");
        }
    }

    async login({username, password}) {
        return await doNetworkRequest(`/api/v1/users/sign_in`, SendMethod.POST,
            null, `{"user":{"username":"${username}","password":"${password}"}}`);
    }

    async logout() {
        return await doNetworkRequest(`${this.prefix}/users/sign_out`,
            SendMethod.DELETE);
    }
}

export default TicketmuleNetwork;