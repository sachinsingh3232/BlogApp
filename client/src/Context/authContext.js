import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const BASE_URL = process.env.REACT_APP_BASE_URL;

export const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("user")) || null);
    const navigate = useNavigate();

    const login = async (inputs) => {
        const res = await axios.post(`${BASE_URL}/auth/login`, inputs, { withCredentials: true });
        navigate('/');
        setCurrentUser(res.data);
    }
    const logOut = async () => {
        await axios.post(`${BASE_URL}/auth/logout`,{}, { withCredentials: true });
        setCurrentUser(null);
        navigate('/login')
    }

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(currentUser));
    }, [currentUser])

    return <AuthContext.Provider value={{ currentUser, login, logOut }}>{children}</AuthContext.Provider>
}