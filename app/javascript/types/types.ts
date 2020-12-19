import { AxiosResponse } from "axios";
import { Dispatch } from "react";

export enum OptionTypes {
    STATUS= "status",
    PRIORITY= "priority",
    GROUP = "group",
    TIME_TYPE = "time_type"
}

export type OptionType = {
    id?: number,
    name: string,
    disabled_at?: string | null
}

export type Result = {
    response: AxiosResponse
}

export type Context = {
    dispatch: Dispatch<any>,
    state: State
}



export type Comment = {
    user: User,
    id?: number,
    comment: string,
    created_at?: string
}


export type Contact = {
    id?: number,
    first_name?: string,
    last_name?: string,
    full_name?: string,
    email?: string,
    affiliation?: string,
    mobile_phone?: string,
    office_phone?: string,
    notes?: string,
    updated_at?: string | null
}

export type Ticket = {
    id?: number,
    title: string,
    details: string,
    contact?: Contact,
    group?: OptionType,
    status?: OptionType,
    time_type?: OptionType,
    priority?: OptionType,
    owner?: User,
    creator?: User,
    created_at?: string,
    updated_at?: string | null
}

export type User = {
    id?: number,
    username?: string,
    first_name?: string,
    last_sign_in_at?: string | null,
    last_sign_in_ip?: string | null,
    last_name?: string,
    time_zone?: string,
    email?: string,
    authentication_token?: string | null
}


export type ResourcePageInfo = {
    currentPage?: number,
    resourceCount?: number,
    lastPage?: number,
    perPage?: number,
    letterSelected?: string
}

export enum RESOURCE_TYPES {
    TICKET = 'ticket',
    CONTACT = 'contact',
    USER = 'user'
}

export enum SEND_METHOD  {
    GET= 'GET',
    POST = 'POST',
    PATCH = 'PATCH',
    PUT = 'PUT',
    DELETE = 'DELETE'
}

export enum TICKET_TYPES  {
    OPENED= 'opened',
    CLOSED= 'closed'
};

export type State = {
    tickets: null | Ticket[],
    flashMsg: null | string,
    ticketPageInfo: ResourcePageInfo,
    contactPageInfo: ResourcePageInfo,
    userPageInfo: ResourcePageInfo,
    contacts: null | Contact[],
    contact: null | Contact,
    ticket: null | Ticket,
    aUser: null | User,
    users: null | User[],
    user: null | User,
    options: null | any,
    isLoggingOut: null | boolean
}
