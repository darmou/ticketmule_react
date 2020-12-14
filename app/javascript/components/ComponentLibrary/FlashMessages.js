import styled from "styled-components";
import { msgFlash } from "../../utils/displayUtils";

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