import styled from "styled-components";
import ButtonGradient from "../../images/button-gradient.png";

export const SecondaryButton = styled.button`
    margin: 3px 0;
    padding: 2px 12px 2px;
    width: auto;
    color: #839F45;
    font-size: 12px;
    font-family: verdana,sans-serif;
    font-weight: bold;
    cursor: pointer;
    -moz-border-radius: 14px;
    -webkit-border-radius: 14px;
    -moz-box-shadow: 0 1px 3px rgba(0,0,0,0.25);
    -webkit-box-shadow: 0 1px 3px rgba(0,0,0,0.25);
    background: #fff url(/assets/${ButtonGradient}) repeat-x 0 0;
    border-color: rgba(0,0,0,0.25) rgba(0,0,0,0.25) rgba(0,0,0,0.35);
    border-style: solid;
    border-width: 1px;
    text-decoration: none;
    text-shadow: 0 1px 1px rgba(255,255,255,0.65);
    outline: none;
    overflow: visible;
    display: inline;
    line-height: 14px;
    &:hover {
      background-color: #f4f4f4;
      color: #666;
      pointer: cursor;
    }
`;

export default SecondaryButton;