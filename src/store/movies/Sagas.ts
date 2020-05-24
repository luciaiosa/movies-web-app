import { call, put } from "redux-saga/effects";
import { getMoviesRequestSuccess, setMoviesError, getMovieByIdRequestSuccess} from './Actions';
import services from '../../services';
import { MovieSearchRequest } from "../../services/movieClient";

export function* getMovies(action: any) {
    try {
        const request: MovieSearchRequest = {
            currentPage: action.payload.currentPage,
            searchTerm: action.payload.searchTerm   
        };
        const response = yield call(services.moviesClient.fetch, request);
        if (services.authService.isLogged()){
            const favouriteMovies = services.userService.getFavouriteMovies();
            response.Search.forEach((element: any) => {
                element.favourite = favouriteMovies.find(fv => fv === element.imdbID) !== undefined
            });
        }
        yield put(getMoviesRequestSuccess(response));
    } catch (error) {
        yield put(setMoviesError(error));
    }
}

export function* getMovieById(action: any) {
    try {
        let movie = yield call(services.moviesClient.fetchById, action.payload);
        if (services.authService.isLogged()){
            const favouriteMovies = services.userService.getFavouriteMovies();
            movie.favourite = favouriteMovies.find(fv => fv === movie.imdbID) !== undefined
        }
        yield put(getMovieByIdRequestSuccess(movie));
    } catch (error) {
        yield put(setMoviesError(error));
    }
}