import { combineReducers } from "redux";
import { AppStore } from "./app";
import {moviesReducer, paginationReducer} from './movies/Reducers';
import {breadcrumbsReducer, isLoggedReducer} from './app/Reducers';

export const rootReducer = combineReducers<AppStore>({
    movieStore: moviesReducer,
    breadcrumbs: breadcrumbsReducer,
    isLogged: isLoggedReducer,
    paginationStore: paginationReducer,
});