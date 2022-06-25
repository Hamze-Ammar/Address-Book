import React from "react";
import { Link } from "react-router-dom";
import { FaLaughWink } from 'react-icons/fa';

export default function Navbar(props) {
  let name = localStorage.getItem("user_name");
  let greetings = `Hi ${name}!`;
  return (
    <div>
      <div className="topnav">
        <div>
          <a className="active">AddressBook</a>
          <Link to="/">
            <span href="#">Show Contacts</span>
          </Link>
          <Link to="/add">
            <span href="#">Add Contact</span>
          </Link>
          <a href="#"></a>
        </div>
        <div className="topnav-middle">
          <a>{name &&  greetings}</a>
          
        </div>
        <div>
          <Link to="/login">
            <span className="topnav-right" href="#">
              Login
            </span>
          </Link>
          <Link to="/register">
            <span className="topnav-right" href="#">
              Register
            </span>
          </Link>
          <a className="topnav-right" href="#">
            Logout
          </a>
        </div>
      </div>
    </div>
  );
}
