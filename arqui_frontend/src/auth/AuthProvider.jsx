import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import PropTypes from "prop-types";

function AuthProvider({ children }) {
    const [token, setToken] = useState(localStorage.getItem("token") || null);
    const [userId, setUserId] = useState(localStorage.getItem("userId") || null);

    useEffect(() => {
        localStorage.setItem("token", token);
    }, [token]);

    useEffect(() => {
        localStorage.setItem("userId", userId);
    }, [userId]);

    function logout() {
        setToken(null);
        setUserId(false);
        console.log("logout");
    }

    function login(userId, token) {
        setUserId(userId);
        setToken(token);
        console.log("login");
    }

    return (
        <AuthContext.Provider value={{ token, userId, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

AuthProvider.propTypes = {
    children: PropTypes.node,
};

export default AuthProvider;