import React from 'react';
import { useContext, useEffect, useState } from 'react';
import './Navbar.css';
import Logo from '../assets/logo.png';
import { Link } from 'react-router-dom';
import { AuthContext } from '../auth/AuthContext';


function Navbar() {
  const token = localStorage.getItem('token');
  const [isLogged, setIsLogged] = useState(token !== "null");
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    setIsLogged(localStorage.getItem('token') !== "null");
  }, [token]);

  const handleLogout = () => {
    setIsLogged(false);
    logout();
  }

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
            <a href='/misvuelos'><button> Mis viajes</button></a>
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
        {!isLogged ? 
          <li className="navbar-item">
            <a href='/login'><button className="navbar-button">Iniciar Sesión</button></a>
          </li>
          : 
          <li className="navbar-item">
            <button onClick={handleLogout} className="navbar-button">Cerrar Sesión</button>
          </li>
        }
      </ul>
    </nav>
  );
}

export default Navbar;
