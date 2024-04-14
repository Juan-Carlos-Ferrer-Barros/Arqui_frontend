import React, { useContext } from 'react';
import { AuthContext } from './AuthContext';

const PageForbidden = () => {
    return (
        <>
            <h1>Error 403: Forbidden page</h1>
            <p>You don't have permission to access this page</p>
            <button onClick={() => window.history.back()}>Go back</button>
        </>
    );
};

const PrivatePage = ({ component: Component, ...rest }) => {
    const { isLogged } = useContext(AuthContext);

    return (
        <>
            {isLogged ? <Component {...rest} /> : <PageForbidden />}
        </>
    );
};

export default PrivatePage;