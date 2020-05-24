import { takeLatest } from "redux-saga/effects";
import { GET_MOVIES, getMovies, GET_MOVIE_BY_ID, getMovieById } from "./movies";

export function* rootSaga() {
    yield takeLatest(GET_MOVIES, getMovies);
    yield takeLatest(GET_MOVIE_BY_ID, getMovieById);
}