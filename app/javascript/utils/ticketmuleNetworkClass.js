import { doNetworkRequest, SendMethod } from "./network";

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

    async updateTicket(appState, data) {
        if (appState.user) {
            return await doNetworkRequest(`/api/v1/tickets/${appState.ticket.id}`,
                SendMethod.PATCH, appState.user.email, appState.user.authentication_token,
                data);
        }
    }

    async deleteTicket(app_state) {
        if (app_state.user && app_state.ticket.id != null) {
            return await doNetworkRequest(`/api/v1/tickets/${app_state.ticket.id}`,
                SendMethod.DELETE, app_state.user.email, app_state.user.authentication_token);
        }
    }

    async fetchOptions() {
        if (this.user) {
            // wait for the fetch to finish then dispatch the result
            return await doNetworkRequest(`${this.prefix}/options`, SendMethod.GET, this.user.email,
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

    async fetchTickets ()  {
        if (this.user) {
            // wait for the fetch to finish then dispatch the result
            return await doNetworkRequest(`${this.prefix}/tickets`, SendMethod.GET, this.user.email,
                this.user.authentication_token);
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