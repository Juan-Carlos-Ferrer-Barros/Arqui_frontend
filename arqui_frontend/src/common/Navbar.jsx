import { useContext, useEffect, useState } from 'react';
import './Navbar.css';
import Logo from '../assets/logo.png';
import { AuthContext } from '../auth/AuthContext';


function Navbar() {
  const token = localStorage.getItem('token');
  const name = localStorage.getItem('name');
  const isAdmin = localStorage.getItem('isAdmin') === "true";
  const [isLogged, setIsLogged] = useState(token !== "null");
  const { logout } = useContext(AuthContext);

  // const [isLogged, setIsLogged] = useState(() => {
  //   const savedToken = JSON.parse(localStorage.getItem('token')) || "null";
  //   console.log('savedToken', savedToken);
  //   const state = savedToken !== "null";
  //   console.log('state', state);
  //   return state;
  // });
  console.log('isLogged', isLogged);
  console.log('token', token);
  console.log('name', name);

  // useEffect(() => {
  //   //window.location.reload(false);
  //   setIsLogged(localStorage.getItem('token') !== "null");
  //   console.log('1', isLogged);
  // }, []);
  
  // useEffect(() => {
  //   const savedName = JSON.parse(localStorage.getItem('name'));
  //   setIsLogged(savedName !== "null");
  //   console.log('2', isLogged);
  // }, [name]);

  useEffect(() => {
    setIsLogged(localStorage.getItem('isAdmin') !== "null");
    console.log(isAdmin)
  }, [isAdmin]);

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
            <a href='/ofertas'><button> Ofertas y destinos</button></a>
        </li>
        <li className='navbar-text'>
            <a href='/misvuelos'><button> Mis viajes</button></a>
        </li>
        <li className='navbar-text'>
            <a href='/recomendaciones'><button> Vuelos para mi</button></a>
        </li>
        <li className='navbar-text'>
            <button> Centro de ayuda</button>
        </li>
        { (isAdmin || name === "Tomas") && (<>
          <li className='navbar-text'>
              <a href='/auctions'><button> Auctions</button></a>
          </li>
          <li className='navbar-text'>
              <a href='/myoffers'><button> Ofertas enviadas</button></a>
          </li>
          <li className='navbar-text'>
              <a href='/myproposals'><button> Propuestas enviadas</button></a>
          </li>
        </>)}
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>

        <li className='navbar-text'>
            <a href='/estadocompras'><button> Estado de compra</button></a>
        </li>
        {isLogged ?
          <li className="navbar-item">
            <a href='/profile' className="navbar-button"><button>{name}</button></a>
          </li>
          :
          <li className="navbar-item">
            <a href='/login'><button className="navbar-button">Iniciar Sesión</button></a>
          </li>
        }
      </ul>
    </nav>
  );
}

export default Navbar;
