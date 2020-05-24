import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useStyles } from "./MenuStyles";
import { loginRoute } from "@config/routes";
import services from '@services';
import { Button } from "@material-ui/core";
import { setIsLogged } from '@stores/app/Actions';
import { useDispatch, useSelector } from "react-redux";
import { AppStore } from "@stores/app";

const Menu = (): JSX.Element => {
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();

    const isLogged = useSelector<AppStore, boolean>(state => state.isLogged);

    const logout = () => {
        services.authService.logout();
        dispatch(setIsLogged(false));
        history.push('/');
    }

    const renderMenu = (): JSX.Element => {
        if (!isLogged) {
            return (
                <Link to={loginRoute()} className={classes.linkMenu}>
                    Log in
                </Link>);
        }
        return <Button onClick={logout} className={classes.linkMenu}>
            Log out
            </Button>
    }
    return (
        <div className={classes.linksContainer}>
            {renderMenu()}
        </div>
    );
};

export default Menu;
