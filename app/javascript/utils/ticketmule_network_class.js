import { doNetworkRequest, SendMethod } from "./network";
import { ticketsTypes } from "../actions/ticket_store";

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



    async deleteTicket(id) {
        if (this.user) {
            return await doNetworkRequest(`${this.prefix}/tickets/${id}`, SendMethod.DELETE, this.user.email,
                this.user.authentication_token);
        }
    }

    async deleteComment(app_state, id) {
        if (app_state.user && id != null && app_state.ticket.id != null) {
            return await doNetworkRequest(`/api/v1/tickets/${app_state.ticket.id}/comments/${id}`,
                SendMethod.DELETE, app_state.user.email,
                app_state.user.authentication_token);
        }
    }

    async addComment(app_state, data) {
        if (app_state.user) {
            return await doNetworkRequest(`/api/v1/tickets/${app_state.ticket.id}/comments`,
                SendMethod.POST, app_state.user.email, app_state.user.authentication_token,
                `{"comment":{"comment":"${data["comment"]}","close_ticket":${data["close_ticket"]}}}`);
        }
    }

    async addAttachment(app_state, data) {
        if (app_state.user) {
            return await doNetworkRequest(`/api/v1/tickets/${app_state.ticket.id}/attachments`,
                SendMethod.POST, app_state.user.email, app_state.user.authentication_token,
                `{"attachment":{"attachment":"${data["attachment"]}}}`);
        }
    }

    async fetchTickets (type = null)  {

        if (this.user) {
            // wait for the fetch to finish then dispatch the result
            const typeParam = (type && type !== ticketsTypes.NOT_CLOSED) ? `?type=${type.toString()}` : '/';
            return await doNetworkRequest(`${this.prefix}/tickets${typeParam}`, SendMethod.GET, this.user.email,
                this.user.authentication_token);
        }
    }

    async login(username, password) {
        return await doNetworkRequest(`${this.prefix}/users/sign_in`,
            SendMethod.POST, null, null,
            `{"user":{"username":"${username}","password":"${password}"}}`);
    }

    async logout() {
        return await doNetworkRequest(`${this.prefix}/users/sign_out`,
            SendMethod.DELETE);
    }
}

export default TicketmuleNetwork;