import { useContext } from 'react';
import { AuthContext } from '../auth/AuthContext';

const LogoutButton = () => {
    const { logout } = useContext(AuthContext);

    return (
        <button className='logout-button' onClick={logout}>
            Logout
        </button>
    );
};

export default LogoutButton;