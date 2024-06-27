import { useContext } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import { AuthContext } from '../auth/AuthContext'


function UserProfile() {
  const { login, logout } = useContext(AuthContext);
  const token = localStorage.getItem('token');
  const name = localStorage.getItem('name');
  const navigate = useNavigate();

  const handleClick = () => {
    logout();
    navigate('/');
    window.location.reload();
  };

  return (
    <div>
      <h1>User: {name}</h1>
      <button onClick={handleClick}>
        Cerrar Sesión
      </button>
    </div>
  );
}

export default UserProfile;