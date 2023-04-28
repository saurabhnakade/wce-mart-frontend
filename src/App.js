import React, { useEffect } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import Navbar from "./components/Navbar";
import CreateProduct from "./pages/CreateProduct";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import MyProducts from "./pages/MyProducts";
import AllProducts from "./pages/AllProducts";
import Product from "./pages/Product";
import {
    BrowserRouter as Router,
    Route,
    Redirect,
    Switch,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import AuthContext from "./context/auth-context";
import useAuth from "./hooks/auth-hook";
import url from "./firebase/config";
import Notifications from "./pages/Notifications";

const App = () => {
    const { token, login, logout, id, name } = useAuth();

    useEffect(() => {
        const start = async () => {
            await fetch(`${url}/`);
            console.log("Hello");
        };
        start();
    }, []);

    let routes;
    if (token) {
        routes = (
            <Switch>
                <Route path="/all" exact>
                    <AllProducts />
                </Route>
                <Route path="/create" exact>
                    <CreateProduct />
                </Route>
                <Route path="/myproducts" exact>
                    <MyProducts />
                </Route>
                <Route path="/product/:id" exact>
                    <Product />
                </Route>
                <Route path="/notification" exact>
                    <Notifications/>
                </Route>
                <Redirect to="/all" />
            </Switch>
        );
    } else {
        routes = (
            <Switch>
                <Route path="/" exact>
                    <HomePage />
                </Route>
                <Route path="/login" exact>
                    <LoginPage />
                </Route>
                <Route path="/signup" exact>
                    <SignUpPage />
                </Route>
                <Redirect to="/" />
            </Switch>
        );
    }

    return (
        <AuthContext.Provider
            value={{
                isLoggedIn: !!token,
                token: token,
                id: id,
                name: name,
                login: login,
                logout: logout,
            }}
        >
            <ChakraProvider>
                <Router>
                    {!!token && <Navbar />}
                    {routes}
                </Router>
            </ChakraProvider>
        </AuthContext.Provider>
    );
};

export default App;
