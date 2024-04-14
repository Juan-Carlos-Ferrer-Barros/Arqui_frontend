import { useContext } from 'react';
import { AuthContext } from './AuthContext';
import PropTypes from 'prop-types';

const PageForbidden = () => {
    return (
        <>
            <h1>Error 403: Forbidden page</h1>
            <p>You don&apos;t have permission to access this page</p>
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

PrivatePage.propTypes = {
    component: PropTypes.func,
};

export default PrivatePage;