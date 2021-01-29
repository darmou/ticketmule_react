import React from "react";
import styled, { keyframes } from "styled-components";
import { RESOURCE_TYPES } from "../types/types";

export const SLIDE_DURATION = 800;

export const getAttachmentFileSize = (byteFileSize) => {
    return (byteFileSize *  0.000977).toFixed(1);
};

const cleanData = (data) => {
    Object.keys(data).map(key => {
        if (key.endsWith("_id") || key.endsWith("_by")) {
            data[key] = (data[key]) ? parseInt(data[key]) : null;
        }
    });
    return data;
};

export const getQueryKey =  (resourceType: RESOURCE_TYPES) => {
    return (resourceType === RESOURCE_TYPES.USER) ? "aUser" : `${resourceType}`;
};

export const onSubmitForm = async (data, type, formAction) => {
    data = cleanData(data);
    try {
        const toSend = {
            [type]: data
        };

        if (formAction != null) {
            await formAction(JSON.stringify(toSend));
        }

    } catch (error) {
        console.error(error);
    }
};

export const isEmpty = (str) => {
    return (!str || 0 === str.length);
};

export const deleteAlert = async (alert, deleteTheAlert) => {
    if (window.confirm(`Really remove alert for ticket #${alert.ticket_id}?`)) {
        //useMutation to delete this alert
        await deleteTheAlert(alert);
    }
};

export const capitalizeEachWord = (str) => {
    return str.replace(/\w\S*/g, txt => {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
};

export const stringToBoolean = (string: string | null) => {
    if (string == null) {
        return false;
    }
    switch(string.toLowerCase().trim()){
        case "true": case "yes": case "1": return true;
        case "false": case "no": case "0": case null: return false;
        default: return Boolean(string);
    }
};

export const msgFlash = keyframes`
  from {opacity :1;}
  to {opacity :0;}
`;

export const personDateFormat = "DD MMM YYYY hh:mm A";

export const getResourcePageInfo = (resourceType, ticketPageInfo, contactPageInfo, userPageInfo) => {
    switch (resourceType) {
        case RESOURCE_TYPES.TICKET:
            return ticketPageInfo;
        case RESOURCE_TYPES.CONTACT:
            return contactPageInfo;
        case RESOURCE_TYPES.USER:
            return userPageInfo;
    }
};

export const renderList = (list_items, style) => {
    const list = list_items.map(list_item =>
        <LIStyled key={list_item.id} >
            {list_item.content}
        </LIStyled>
    );
    return <ULStyled style={style}>
        {list}
    </ULStyled>;
};

const ULStyled = styled.ul`
    list-style: none;
    position: relative;
    display: inline-block;
    bottom: 0;
    left: 0;
    font-size: 10px;
    height: 55px;
    margin: 0;
    padding: 0;
    background: #fff;
    white-space: nowrap;
`;

const LIStyled = styled.li`
    position: relative;
    float: left;
    width: 0.9em;
    margin: 0 2px 0 0;
    padding: 0;
    height: 100%;
    background: #f2f2f2;
    &:hover {
        background: #dedede;
    }
    
    a {
        cursor: default;
        display: block;
        height: 100%;
   
    }
`;

