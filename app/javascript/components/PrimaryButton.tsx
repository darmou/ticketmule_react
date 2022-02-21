import React from "react";
import ButtonGradient from "../images/button-gradient.png";

import styled from "styled-components";

interface Props  {
    click: (e: MouseEvent) => void,
    text: string
}
const PrimaryButton = ({click, text}: Props) => {
    return (<PrimaryButtonStyled onClick={click}>
            {text}
        </PrimaryButtonStyled>
    );
};


const PrimaryButtonStyled = styled.button`
    margin: 0 0 8px 0;
    padding: 3px 12px 4px;
    background: #90af4c url(/assets/${ButtonGradient}) repeat-x 0 0;
    border: 1px solid rgba(0,0,0,0.25);
    color: #fff;
    width: 100%;
    border-radius: 14px;
    display: block;
    font-size: 13px;
    font-family: verdana,sans-serif;
    font-weight: bold;
    text-shadow: 0 -1px 1px rgba(0,0,0,0.35);
    &:focus {
        outline:0;
    }
    &:hover {
      cursor: pointer;
       background-color: #839F45;
    }
`;

export default PrimaryButton;