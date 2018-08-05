import React from "react";
import { Link } from "react-router-dom";
import styles from "styles/Menu";
import PropTypes from "prop-types";

const Menu = (props) => {


  const menu_items = props.menuItems.map(menu_item =>
      <li key={menu_item.id}>
        <Link to={menu_item.path}>
          {menu_item.text}
        </Link>
      </li>
  );


  return (
      <div className={styles.Menu}>
        <ul>
          {menu_items}
        </ul>
      </div>

  );
};


Menu.propTypes = {
  menuItems: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    path: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
  }).isRequired).isRequired,
};

export default Menu;