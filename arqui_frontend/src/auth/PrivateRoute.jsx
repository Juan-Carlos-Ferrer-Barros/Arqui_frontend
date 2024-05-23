// import { Outlet, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
// import { AuthContext } from "./AuthContext";
import PropTypes from "prop-types";

const PageForbidden = () => {
    return (
        <>
            <h1>403</h1>
            <p>Forbidden</p>
            <button onClick={() => window.history.back()}>Go back</button>
        </>
    );
};
const PrivateRoute = ({ element: Element, ...rest }) => {
    const token = localStorage.getItem('token');
    const [isLogged, setIsLogged] = useState(token !== "null");

    useEffect(() => {
        setIsLogged(localStorage.getItem('token') !== "null");
    }, [token]);

    return (
        isLogged ? <Element {...rest} /> : <PageForbidden />
    );
};

PrivateRoute.propTypes = {
    element: PropTypes.func,
};

export default PrivateRoute;