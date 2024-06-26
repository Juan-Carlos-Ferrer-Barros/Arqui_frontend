import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import PropTypes from "prop-types";

function AuthProvider({ children }) {
    const [token, setToken] = useState(localStorage.getItem("token") || null);
    const [name, setName] = useState(localStorage.getItem("name") || null);
    const [admin, setAdmin] = useState(localStorage.getItem("admin") || null);
    // const [userId, setUserId] = useState(localStorage.getItem("userId") || null);

    useEffect(() => {
        localStorage.setItem("token", token);
    }, [token]);

    useEffect(() => {
        localStorage.setItem("name", name);
    }, [name]);

    useEffect(() => {
        localStorage.setItem("admin", admin);
    }, [admin]);

    // useEffect(() => {
    //     localStorage.setItem("userId", userId);
    // }, [userId]);

    function logout() {
        setToken(null);
        setName(null);
        setAdmin(null);
        // setUserId(false);
        window.location.reload(false);
        console.log("logout");
    }

    function login(token, name, admin) {
        // setUserId(userId);
        setToken(token);
        setName(name);
        setAdmin(admin);
        console.log("login");
    }

    return (
        <AuthContext.Provider value={{ token, name, admin, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

AuthProvider.propTypes = {
    children: PropTypes.node,
};

export default AuthProvider;