import {Breadcrumb} from './AppStore';

export const SET_BREADCRUMBS = 'SET_BREADCRUMBS';
export const SET_IS_LOGGED = "SET_IS_LOGGED";

export const setBreadcrumbs = (breadcrumbs: Breadcrumb[]) => ({
    type: SET_BREADCRUMBS,
    payload: breadcrumbs
});

export const setIsLogged = (value: boolean) => ({
    type: SET_IS_LOGGED,
    payload: value
});