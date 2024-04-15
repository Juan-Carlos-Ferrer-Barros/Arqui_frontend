import React from 'react';
import { useContext, useEffect } from 'react';
import './Navbar.css';
import Logo from '../assets/logo.png';
import { Link } from 'react-router-dom';

function Navbar() {


  return (
    <nav className="navbar">
      <ul className="navbar-list">
        {/* Tengo que poner el logo, un dropdown de ofertas y destinos, que tenga ofertas de vuelos, destinos. 
        Después un dropdown de mis viajes donde tenga Administar tus viajes y check in, 
        después centro de ayuda, estado de vuelo y un botón de iniciar sección
       */}
        <li className = "navbar-item">
          <a href = "/" className="navbar-logo">
            <img src={Logo} alt="Logo" className="navbar-logo-img"/>
          </a>
        </li>
        <li className='navbar-text'>
            <button> Ofertas y destinos</button>
        </li>
        <li className='navbar-text'>
            <button> Mis viajes</button>
        </li>
        <li className='navbar-text'>
            <button> Centro de ayuda</button>
        </li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>

        <li className='navbar-text'>
            <button> Estado de vuelo</button>
        </li>
        <li className="navbar-item">
          <a href='/login'><button className="navbar-button">Iniciar Sesión</button></a>
        </li>
      
      </ul>
    </nav>
  );
}

export default Navbar;
