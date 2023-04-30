import React from "react";
import './NavBar.css'
import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const NavBar = () => {

  var navigate = useNavigate();

  const handleLogout = async e => {

    e.preventDefault();

    localStorage.removeItem('token');

    navigate("/login");
  }

  return (
    <>
      <header style={{zIndex: 10}}>
        <nav>
          <ul>
            <li>
              <NavLink to="/profile">Profile</NavLink>
            </li>
            <li>
              <NavLink to="/">Films</NavLink>
            </li>
            <li>
              <NavLink to="/collections">Collections</NavLink>
            </li>
            <li>
              <NavLink onClick={handleLogout} to="/login">Logout</NavLink>
            </li>
          </ul>
        </nav>
      </header>
      <ToastContainer/>
    </>
  );
};

export default NavBar;