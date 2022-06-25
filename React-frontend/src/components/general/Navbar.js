import React from "react";
import { Link } from "react-router-dom";


export default function Navbar(props) {
  return (
    <div>
      <div className="topnav">
        <div>
          <a className="active">
            AddressBook
          </a>
         <Link to="/"><span href="#"> 
            Show Contacts
            </span></Link>
            <Link to= "/admin">
          <span href="#">Add Contact</span></Link>
          <a href="#"></a>
        </div>
        <div className="topnav-middle"></div>
        <div>
        <Link to="/login"><span className="topnav-right" href="#">
            Login
          </span></Link>
          <Link to="/register">
          <span className="topnav-right" href="#">
            Register
          </span></Link>
          <a className="topnav-right" href="#">
            Logout
          </a>
        </div>
      </div>
    </div>
  );
}