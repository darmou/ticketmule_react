import React from "react";
import styled, { keyframes } from "styled-components";

export const renderTableHeader = (header_items) => {
    const header = header_items.map(header_item =>
        <th key={header_item.id} >
            {header_item.content}
        </th>
    );

    return <HeaderStyled>
        {header}
    </HeaderStyled>;
};

export const getAttachmentFileSize = (byteFileSize) => {
    return (byteFileSize *  0.000977).toFixed(1);
};

export const msgFlash = keyframes`
  from {opacity :1;}
  to {opacity :0;}
`;

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
const HeaderStyled = styled.tr`
    background: #f1f1f1;
`;

