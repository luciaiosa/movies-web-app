import React, { FunctionComponent, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import { useSelector, useDispatch } from "react-redux";
import { AppStore } from "../../store/app/AppStore";
import Spinner from "../../components/spinner/Spinner";
import { Container } from "@material-ui/core";
import services from "../../services";
import { setIsLogged } from "../../store/app";
import Login from "../../containers/login/Login";
import { loginRoute, homeRoute } from "../../config/routes";
import Home from "../../containers/home/Home";
import { styles } from "./AppStyles";
import "./App.scss";

const App: FunctionComponent = () => {
    const state = useSelector<AppStore, AppStore>((state) => state);
    const loading = state.movieStore.loading;
    const dispatch = useDispatch();
    const classes = styles();

    useEffect(() => {
        dispatch(setIsLogged(services.authService.isLogged()));
    }, []);

    return (
        <div className={classes.body}>
            {loading ? <Spinner /> : null}
            <BrowserRouter>
                <Switch>
                    <Route path={loginRoute()} exact component={Login} />
                    <>
                        <Header />
                        <Container maxWidth="xl">
                            <Route path={homeRoute()} exact component={Home} />
                        </Container>
                        <Footer content="❮❯ by OMDB 2020" />
                    </>
                </Switch>
            </BrowserRouter>
        </div>
    );
};

export default App;