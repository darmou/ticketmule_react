import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

type MenuItem = {
    id: number,
    path: string,
    text: string
}

interface Props {
    menuItems: MenuItem[]
}

const Menu = ({menuItems}: Props) => {
  const menu_items = menuItems.map(menuItem =>
      <li key={menuItem.id} >
        <LinkElem end={menuItem.path === '/'}  to={menuItem.path} >
          {menuItem.text}
        </LinkElem>
      </li>
  );

  return (
      <MenuStyled>
        <ul>
          {menu_items}
        </ul>
      </MenuStyled>
  );
};


const LinkElem = styled(NavLink)`
    &.active {
        background: #90af4c !important;
        color: white !important;
    }
`;

const MenuStyled = styled.div`
  position: absolute;
  top: 48px;
  right: 40px;
  ul {

    li {
      float: left;
      display: block;
      a {
        height: 21px;
        line-height: 21px;
        float: left;
        padding: 0 14px 0 14px;
        border-radius: unset;
        margin: 0 0 0 2px;
        color: #bbb;
        text-decoration: none;
        font-size: 12px;
        font-weight: 700;
        text-shadow: 1px 2px 2px #555;
        outline: none;
        background: #484848;
        text-align: center;
        &:hover, &.active {
          background: #90af4c !important;
          color: white !important;
        }
      }
    }
  }
`;

export default Menu;
