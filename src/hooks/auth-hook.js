import { useCallback, useEffect, useState } from "react";

const useAuth = () => {
    const [token, setToken] = useState(null);
    const [id, setId] = useState(null);
    const [name, setName] = useState(null);

    const login = useCallback((uid, token, name) => {
        setToken(token);
        setId(uid);
        setName(name);

        localStorage.setItem(
            "userData",
            JSON.stringify({
                userId: uid,
                token: token,
                name: name,
            })
        );
    }, []);

    const logout = useCallback(() => {
        setToken(null);
        setId(null);
        localStorage.removeItem("userData");
    }, []);

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem("userData"));
        if (
            storedData &&
            storedData.token 
        ) {
            login(
                storedData.userId,
                storedData.token,
                storedData.name,
            );
        }
    }, [login, name]);

    return { token, login, logout, id, name };
};

export default useAuth;
