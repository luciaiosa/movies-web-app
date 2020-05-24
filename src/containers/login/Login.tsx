import React, { FunctionComponent, useState } from "react";
import { styles } from "./LoginStyles";
import LoginForm from "../../components/forms/LoginForm";
import services from '../../services';
import { useHistory } from "react-router-dom";
import { setIsLogged } from '../../store/app/Actions';
import { useDispatch } from "react-redux";
import { homeRoute } from "../../config/routes";

export interface User {
    email: string;
    password: string;
}

const Login: FunctionComponent = (): JSX.Element => {

    const history = useHistory();
    const dispatch = useDispatch();
    const classes = styles();
    const [hasError, setHasError] = useState(false);

    const onSubmit = (data: User) => {
        var result = services.authService.logIn(data.email, data.password);
        if (result) {
            setHasError(false);
            dispatch(setIsLogged(result));
            history.push(homeRoute());
        }
        else {
            setHasError(true);
        }
    }

    const renderContent = (): JSX.Element => {
        return (
            <div className={classes.content}>
                <LoginForm onSubmit={onSubmit}></LoginForm>
            </div>
        );
    };
    const renderErrorMessage = (): JSX.Element | null => {
        if (hasError) {
            return (
                <div className={classes.error}>
                    <span>Sorry, email or password unknown. Please try again.</span>
                </div>
            );
        }
        return null;
    };

    return (
        <div className={classes.root}>
            <div className={classes.container}>
                {renderErrorMessage()}
                {renderContent()}
            </div>
        </div>
    );
};

export default Login;
