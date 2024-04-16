import { useState } from 'react'
import axios from 'axios'
import Logo from '../assets/logo.png'
import DarkLogo from '../assets/darklogo.png'
import Background from '../assets/background.jpg'
import './User.css'

function UserSignup() {
    const [rut, setRut] = useState('');
    // const [formatRut, setFormatRut] = useState('');
    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState({type: 0, text: ''});

    const handleSubmit = async (event) => {
        event.preventDefault();

        console.log(1);
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/signup`, {
            rut,
            name,
            lastname,
            email,
            password
        }).then((response) => {
            if (response.status === 201) {
                console.log('Usuario creado');
                setMsg({type: 3, text: 'Usuario creado exitosamente'});
            }
        }).catch((error) => {
            if (error.response.status === 400) {
                console.log('Missing required fields');
            }
            else if (error.response.status === 406) {
                console.log('Invalid credentials');
            }
            else if (error.response.status === 409) {
                console.log('User already exists');
                setMsg({type: 1, text: 'El usuario ya existe'});
            }
        });
    }
    return (
    <div>
        <div className = "background">
            <div className = "opacity"></div>
                <img src={Background} alt="Background" className="background-image"/>
            <div className = "form-container">
                <div className = "form">
                <a href='/'><img src={DarkLogo} alt="Logo" className="logo-container"/></a>
                    <h2 className="form-title2">Crear usuario</h2>
                    <h3 className='text-container'> Si ya eres parte de flightsUC, no necesitas crear una cuenta nueva. <a href= '/login'>Inicia sesión </a> con tus datos de siempre </h3>
                    <form>
                        <div className="form-group">
                            <input
                                type="name"
                                id="rut"
                                name="rut"
                                maxLength={12}
                                // pattern='/^[0-9]{1,2}\.?[0-9]{3}\.?[0-9]{3}-?[0-9Kk]$/'
                                placeholder='Número de cédula de identidad'
                                value={rut}
                                onChange={(e) => setRut(e.target.value)}
                                // onBlur={(e) => handleRut(e.target.value)}
                                required
                            />
                            <input
                                type="name"
                                id="name"
                                name="name"
                                placeholder='Nombre(s)'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                            <input
                                type="name"
                                id="apellido"
                                name="apellido"
                                placeholder='Apellidos'
                                value={lastname}
                                onChange={(e) => setLastname(e.target.value)}
                                required
                            />
                        </div>
                        <h3 className='form-title2'>Datos de ingreso a tu cuenta</h3>
                        <div className="form-group">
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder='email@example.com'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            {msg.type === 1 && <p className="error">{msg.text}</p>}
                            <input
                                type="password"
                                id="password"
                                name="passworc"
                                placeholder='Contraseña'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        {msg.type === 3 && <p className="success">{msg.text}</p>}
                        <button onClick={handleSubmit} className="form-button">Crear cuenta</button>
                        
                    </form>
                </div>
            </div>
        </div>
    </div>
    )
}


    


export default UserSignup;