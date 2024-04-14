import React from 'react';
import { useContext, useEffect } from 'react';
import './Navbar.css';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../auth/AuthContext';
import LogoutButton from '../components/LogoutButton';

function LoggedOptions() {
  return (
      <>
          <NavLink to="/profile">Profile</NavLink>
          <NavLink to="/users">Users</NavLink>
          <LogoutButton />
      </>
  )
}

function UnloggedOptions() {
  return (
      <>
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/register">Register</NavLink>
      </>
  )
}

function Navbar() {
  const { isLogged } = useContext(AuthContext);

  return (
    <>
    <nav className="navbar">
    <NavLink to="/">Home</NavLink>
    {isLogged ? <LoggedOptions /> : <UnloggedOptions />}
      <ul className="navbar-list">
        <li className='navbar-item'>
          Hola
        </li>
      
      </ul>
    </nav>
    </>
  );
}

export default Navbar;
