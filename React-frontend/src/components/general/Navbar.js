import React from "react";
import { Link } from "react-router-dom";
import { FaLaughWink } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";


export default function Navbar(props) {
  let name = localStorage.getItem("user_name");
  let greetings = `Hi ${name}!`;
  let navigate = useNavigate();

  const logOut = () => {
    if (!localStorage.getItem('user_name')){return}
    localStorage.removeItem('user_id');
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_name');
    alert("You are now logged out!")
    navigate('/login');
  }
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
          {!name && <Link to="/login">
            <span className="topnav-right" href="#">
              Login
            </span>
          </Link>}
          {!name && <Link to="/register">
            <span className="topnav-right" href="#">
              Register
            </span>
          </Link>}
          <a className="topnav-right" href="#" onClick={logOut}>
            Logout
          </a>
        </div>
      </div>
    </div>
  );
}
