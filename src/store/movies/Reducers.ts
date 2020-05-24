import {GET_MOVIES, GOT_MOVIES, GET_MOVIE_BY_ID,
     GOT_MOVIE_BY_ID, 
    CLEAR_SELECTED_MOVIE, SET_MOVIES_ERROR, SET_FAVOURITE_MOVIE, REMOVE_FAVOURITE_MOVIE, SET_PAGINATION_SELECTED_PAGE, SET_PAGINATION_ELLIPSE_UPPER_PAGES_NUMBER, SET_PAGINATION_ELLIPSE_LOWER_PAGES_NUMBER} from './Actions';
import {InitialMovieStore, MovieStore, PaginationStore, InitialPaginationStore} from './MovieStore';
import { Reducer, AnyAction } from 'redux';

export const moviesReducer: Reducer<MovieStore, AnyAction> = (state = InitialMovieStore, action) => {
    switch (action.type) {
        case GET_MOVIES:
        case GET_MOVIE_BY_ID:
            return { 
                ...state, loading: true 
            };
        case GOT_MOVIES:
            return {
                ...state,
                loading: false,
                movies: action.payload.Search,
                pages: action.payload.totalResults / 10,
                errorMessage: "",
                hasError: false
            };
        case SET_FAVOURITE_MOVIE:
            const updatedFavouriteMovies = state.movies.map(movie => {
                return movie.favourite 
                    ? movie 
                    : {...movie, favourite: movie.imdbID === action.payload};
            })
            
            const selectedMovieUpdated = state.selectedMovie
                ? {...state.selectedMovie, favourite: state.selectedMovie.imdbID === action.payload}
                : state.selectedMovie;

            return {...state, movies: updatedFavouriteMovies, selectedMovie: selectedMovieUpdated};
        case REMOVE_FAVOURITE_MOVIE:
            const updateRemoveMovies = state.movies.map(movie => {
                if (movie.imdbID === action.payload){
                    movie.favourite = false;
                }
                return movie;
            })

            const selectedMovie = state.selectedMovie
                ? {...state.selectedMovie, favourite: !state.selectedMovie.imdbID === action.payload}
                : state.selectedMovie;

            return {...state, movies: updateRemoveMovies, selectedMovie: selectedMovie};
        case GOT_MOVIE_BY_ID:
            return {
                ...state,
                loading: false,
                selectedMovie: action.payload,
                errorMessage: "",
                hasError: false
            }
        case CLEAR_SELECTED_MOVIE:
            return {
                ...state,
                selectedMovie: undefined
            }
        case SET_MOVIES_ERROR:
            return {
                ...state,
                loading: false,
                hasError: true,
                errorMessage: action.payload.message
            }
        default:
            return state;
    }
}

export const paginationReducer: Reducer<PaginationStore, AnyAction> = (state = InitialPaginationStore, action) => {
    switch (action.type) {
        case SET_PAGINATION_SELECTED_PAGE:
            return { 
                ...state, currentPage: action.payload 
            };
        case SET_PAGINATION_ELLIPSE_UPPER_PAGES_NUMBER:
            return {
                ...state, ellipseUpperPagesNumber: action.payload            
            };
        case SET_PAGINATION_ELLIPSE_LOWER_PAGES_NUMBER:
            return {...state, ellipseLowerPagesNumber: action.payload}
        default:
            return state;
    }
}