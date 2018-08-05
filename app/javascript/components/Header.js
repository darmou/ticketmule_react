
import React from 'react';
import PropTypes from 'prop-types';
import styles from "styles/Header";

const menuItems = [
  { id: 0, path: "/", text: "Dashboard" },
  { id: 1, path: "/tickets", text: "Tickets" },
  { id: 2, path: "/contacts", text: "Contacts" },
  { id: 3, path: "/users", text: "Users" },
  { id: 4, path: "/admin", text: "Admin" }

];

const Header = () => {
  return (
      <header className={styles.Header}>
        <h1 className={styles.appTitle}>TicketMule</h1>
        <p id="status">Signed in as&nbsp;
          <a href="/users/1">{this.props.username}</a>
          &nbsp;&nbsp;|&nbsp;&nbsp;<a href="/logout" data-confirm="Really sign out?" data-method="delete" rel="nofollow">Sign out</a></p>
        <Menu menuItems={menuItems}/>
      </header>
  )
};


Header.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.username.isRequired,
    email: PropTypes.string.isRequired,
    token: PropTypes.string.isRequired
  }).isRequired
}

export default Header;

