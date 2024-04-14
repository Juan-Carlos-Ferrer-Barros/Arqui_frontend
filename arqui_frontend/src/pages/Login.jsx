import { useState, useContext } from 'react';
import { AuthContext } from '../auth/AuthContext';
import axios from 'axios';

function Login() {
    const { login } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/login`, {
            email,
            password,
        }).then((response) => {
            if (response.status === 200) {
                return login(response.data.userId, response.data.access_token);
            }
            else if (response.status === 401) {
                setMsg('Usuario o contraseña incorrecta');
            }
            else if (response.status === 404) {
                setMsg('Usuario no encontrado');
            }
            console.error(response);
        }).catch((error) => {
            console.error(error);
        });
    }

    return (
        <>
            <h1>Login</h1>
            {msg && <h1>{msg}</h1>}
            <form onSubmit={handleSubmit}>
                <label htmlFor='email' className='form-email'>
                    Email:
                    <input
                        name='email'
                        type='email'
                        placeholder='username@example.com'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </label>
                <label htmlFor='password' className='form-password'>
                    Password:
                    <input
                        name='password'
                        type='password'
                        placeholder='Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>
                <button type='submit'>Login</button>
                {/* <input type="submit" value="Submit" /> */}
            </form>
        </>
    )
}

export default Login;