import React, { useContext } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import Menu from "./Menu";
import { TicketContext } from "../packs/application";
import HeadBackground from "../images/head-bg.gif";
import UserStore from "../actions/userStore";

const menuItems = [
  { id: 0, path: "/", text: "Dashboard" },
  { id: 1, path: "/tickets", text: "Tickets" },
  { id: 2, path: "/contacts", text: "Contacts" },
  { id: 3, path: "/users", text: "Users" }
];

const Header = () => {
  const { dispatch, state } = useContext(TicketContext);
  const { user } = state;

  const fullMenusItems = (user && user.admin) ? [...menuItems, { id: 4, path: "/admin", text: "Admin" }] : menuItems;
  const navigate = useNavigate();

  const signedIn = (state.user) ? (<div><StatusStyled>Signed in as&nbsp;
          <a href="/users/1">{state.user.username}</a>
          &nbsp;&nbsp;|&nbsp;&nbsp;<Link to="/" onClick={async () => {
            if (window.confirm("Really sign out?")) {
                dispatch({action_fn: UserStore.setUser, user: null});
            }
          }
      }>Sign out</Link></StatusStyled>
      <Menu menuItems={fullMenusItems}/></div>) : null;

  return (
      <HeaderStyled>
          <AppTitleStyled onClick={() => navigate('/')}>TicketMule</AppTitleStyled>
          {signedIn}
      </HeaderStyled>
  );
};

const HeaderStyled = styled.header`
    width: 100%;
    background: #2d2d2d url(${HeadBackground}) top left repeat-x;
    border-bottom: 4px solid #90af4c;
    height: 80px;
    overflow: hidden;
    padding-top: 0;
    padding-right: 4%;
    padding-left: 15px;
`;

const AppTitleStyled = styled.h1`
    line-height: 74px;
    margin-top: 6px;
    color: #999;
    width: 0;
    font-family: "Trebuchet MS",sans-serif;
    text-shadow: 0 3px 0 #111;
    font-size: 22px;
    letter-spacing: -1px;
    &:hover {
      color: #ccc;
      cursor: default;
    }
`;

const StatusStyled = styled.p`
    position: absolute;
    top: 6px;
    background-color: #2d2d2d;
    font: 11px/16px Verdana,sans-serif;
    right: 40px;
    color: #bbb;
    border: 1px solid #bbb;
    padding: 5px;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    margin-top: 0;
    border-top-color: #2d2d2d;
    a {
      color: #bbb;
    }
`;

export default Header;

