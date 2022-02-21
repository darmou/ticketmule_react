import styled from "styled-components";
import { msgFlash } from "../../utils/displayUtils";
import EnableIcon from "../../images/accept.png";
import DisableIcon from "../../images/disable.png";
import React from "react";

export const TIMEOUT = 2000;

export const NotificationStyled = styled.div`
  text-align: left;
  padding: 5px 10px 5px;
  display: flex;
  align-items: center;
  margin-bottom: 5px;

  animation:${msgFlash} 0.5s 1;
  animation-fill-mode: forwards;

  animation-delay:2s;
  -webkit-animation-delay:1s; /* Safari and Chrome */
  -webkit-animation-fill-mode: forwards;
  
  img {
    margin-right: 5px;
  }
`;

export const SuccessNotificationStyled = styled(NotificationStyled)`
  background-color: #efe;
  color: #585;
`;

export const ErrorNotificationStyled = styled(NotificationStyled)`
    color: #D8000C;
    background-color: #FFBABA;
`;


export const createStandardSuccessMessage = (msg:string) => {
    return (<SuccessNotificationStyled>
        <img src={`/assets/${EnableIcon}`} /> {msg}
    </SuccessNotificationStyled>);
};

export const createStandardErrorMessage = (msg:string) => {
    return (<ErrorNotificationStyled>
        <img src={`assets/${DisableIcon}`} /> {msg}
    </ErrorNotificationStyled>);
};