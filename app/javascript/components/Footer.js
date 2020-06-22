import React from "react";
import styled from "styled-components";

const Footer = () => {
  return (
      <FooterStyled>
        <p>Powered by&nbsp;<strong><a href="http://www.appogee.net/">TicketMule</a></strong></p>
      </FooterStyled>
  );
};

const FooterStyled = styled.div`
  position: absolute;
  bottom: 0;
  height: 32px;
  width: 100%;
  text-align: center;
  background: #e6e6dc;
  
  p {
      padding: 8px 8px 0 8px;
      margin: 0;
      color: #777;
      text-shadow: 0 1px 0 #fff;
  }
  
  a {
    color: #777;
    text-decoration: none;
    &:hover {
       color: #90af4c;
       text-decoration: underline;
     }
  } 
`;

export default Footer;