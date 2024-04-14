import { useState, useContext } from 'react';
import { AuthContext } from '../auth/AuthContext';
import axios from 'axios';

function Register() {
    const { login } = useContext(AuthContext);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [msg, setMsg] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/signup`, {
            username,
            email,
            password,
        }).then((response) => {
            if (response.status === 201) {
                setMsg('User created');
                console.log('User created');
            }
            else if (response.status === 200) {
                console.log('User created and logged in')
                return login(response.data.userId, response.data.access_token);
            }
            else if (response.status === 400) {
                alert('User already exists');
            }
        }).catch((error) => {
            console.error(error);
        });
    }

    return (
        <>
            <h1>Register</h1>
            {msg && <p>{msg}</p>}
            <form onSubmit={handleSubmit}>
                <label htmlFor='username' className='form-username'>
                    Email:
                    <input
                        name='username'
                        type='text'
                        placeholder='username'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </label>
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
                <label htmlFor='password' className='form-password'>
                    Confirm Password:
                    <input
                        name='password'
                        type='password'
                        placeholder='Password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </label>
                <button type='submit'>Register</button>
                {/* <input type="submit" value="Submit" /> */}
            </form>
        </>
    );
}

export default Register;