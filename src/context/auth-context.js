import { createContext } from "react";

const AuthContext = createContext({
    isLoggedIn: false,
    token: null,
    id: null,
    name: null,
    login: () => {},
    logout: () => {},
});

export default AuthContext;
