import React, { FunctionComponent } from "react";
import { Link, useHistory } from "react-router-dom";
import { styles } from "./HeaderStyles";
import { homeRoute, loginRoute } from "@config/routes";
import { Button } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { AppStore, setIsLogged } from "@stores/app";
import services from "@services";

const Header: FunctionComponent = (): JSX.Element => {
    const classes = styles();
    const history = useHistory();
    const dispatch = useDispatch();

    const isLogged = useSelector<AppStore, boolean>((state) => state.isLogged);

    const logout = () => {
        services.authService.logout();
        dispatch(setIsLogged(false));
        history.push("/");
    };

    const renderMenu = (): JSX.Element => {
        if (!isLogged) {
            return (
                <Link to={loginRoute()} className={classes.link}>
                    <Button variant="contained" color="primary" size="large">
                        Log In
                    </Button>
                </Link>
            );
        }
        return (
            <Button
                onClick={logout}
                variant="contained"
                color="primary"
                size="large"
            >
                Log out
            </Button>
        );
    };

    return (
        <div className={classes.container}>
            <div className={classes.menuContainer}>
                <div className={classes.linkMenu}>
                    <Link to={homeRoute()} className={classes.link}>
                        <h3 className={classes.logoLink}>Movie Web App</h3>
                    </Link>
                </div>
                <div>{renderMenu()}</div>
            </div>
        </div>
    );
};

export default Header;
