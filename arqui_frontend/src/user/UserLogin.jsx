import { useState, useContext } from 'react'
import DarkLogo from '../assets/darklogo.png'
import { useNavigate } from 'react-router-dom';
import Background from '../assets/background.jpg'
import './User.css'
import axios from 'axios'
import { AuthContext } from '../auth/AuthContext'

function UserLogin() {
    const { login } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()
    const [msg, setMsg] = useState({type: 0, text: ''});

    const handleSubmit = async (event) => {
        event.preventDefault();

        axios.post(`${import.meta.env.VITE_AUTH_URL}/login`, {
            email,
            password,
        }).then((response) => {
            console.log(response);
            if (response.data === 'User not found') {
                setMsg({type: 2, text: 'Usuario no encontrado'});
            }
            if (response.data.access_token) {
                login(response.data.access_token, response.data.name, response.data.isAdmin);
                navigate('/')
            }
            // console.error(response);
        }).catch((error) => {
            setMsg({type: 1, text: 'Credenciales inválidas'});
        });
    }
    return (
    <>
        <div className = "background">
            <div className = "opacity"></div>
                <img src={Background} alt="Background" className="background-image"/>
            <div className = "form-container">
                <div className = "form">
                    <a href='/'><img src={DarkLogo} alt="Logo" className="logo-container"/></a>
                    <h2 className="form-title">Ingresa tu usuario</h2>
                    <br></br>
                    <br></br>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder='Email, RUT o Número de socio'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder='Contraseña'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            {msg.type === 1 && <p className="error">{msg.text}</p>}
                        </div>
                        {msg.type === 3 && <p className="success">Sesión iniciada correctamente</p>}
                        <button type='submit' className="form-button">Iniciar sesión</button>
                        <a href='/signup'><li className="cuenta-button">Crear cuenta</li></a>
                        <hr className="line"/>
                        <h3> ¿No puedes ingresar a tu cuenta? Recupera el acceso</h3>
                    </form>
                </div>
            </div>
        </div>
    </>
    )
}





export default UserLogin;