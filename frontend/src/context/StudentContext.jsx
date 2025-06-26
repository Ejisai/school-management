import { createContext, useContext, useState } from "react";
import UserApi from "../services/Api/Student/UserApi";

export const StudentStateContext = createContext({
    user: {},
    authenticated: false,
    setUser: () => {},
    logout: () => {},
    login: (email, password) => {},
    setAuthenticated: () => {},
    setToken: () => {},
});
const StudentContext = ({ children }) => {

    const [user, setUser] = useState({});
    const [authenticated, _setAuthenticated] = useState(
        "true" === window.localStorage.getItem("AUTHENTICATED")
    );

    const login = async (email, password) => {
        // await UserApi.getCsrfToken();
        return UserApi.login(email, password);
    };
    const logout = () => {
        setUser({});
        setAuthenticated(false);
    };
    const setAuthenticated = (isAuthenticated) => {
        _setAuthenticated(isAuthenticated);
        window.localStorage.setItem("AUTHENTICATED", isAuthenticated);
    };
    const setToken = (token) => {
        window.localStorage.setItem("token", token);
    };
    return (
        <StudentStateContext.Provider
            value={{
                user,
                setUser,
                login,
                logout,
                authenticated,
                setAuthenticated,
                setToken,
            }}
        >
            {children}
        </StudentStateContext.Provider>
    );
};
export const useUserContext = () => useContext(StudentStateContext);

export default StudentContext;
