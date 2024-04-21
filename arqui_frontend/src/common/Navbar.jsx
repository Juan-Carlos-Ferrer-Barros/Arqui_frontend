import { useContext, useEffect, useState } from 'react';
import './Navbar.css';
import Logo from '../assets/logo.png';
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
