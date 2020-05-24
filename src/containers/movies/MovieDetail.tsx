import React, { FunctionComponent, useEffect } from "react";
import { RouteComponentProps } from "react-router";
import "./MovieDetail.scss";
import { useDispatch, useSelector } from "react-redux";
import { AppStore } from "@stores/app";
import {
    MovieStore,
    getMovieByIdRequest,
    clearSelectedMovie,
    setFavouriteMovie,
    removeFavouriteMovie,
    Rating,
} from "@stores/movies";
import services from "@services";
import { Link } from "react-router-dom";
import { homeRoute } from "@config/routes";
import {
    Card,
    Typography,
    Divider,
    Button,
} from "@material-ui/core";
import { Favourite } from "@components/favourite/Favourite";
import { MovieDetailInfo } from "./MovieDetailInfo";
import { Ratings } from "@components/ratings/Ratings";
import CustomError from "@components/error/Error";

type MovieDetailParams = { id: string };

const MovieDetail: FunctionComponent<RouteComponentProps<MovieDetailParams>> = (
    props
) => {
    const dispatch = useDispatch();
    const { selectedMovie, hasError, errorMessage } = useSelector<
        AppStore,
        MovieStore
    >((state) => state.movieStore);
    const isLogged = useSelector<AppStore, boolean>((state) => state.isLogged);

    useEffect(() => {
        const { params } = props.match;
        dispatch(getMovieByIdRequest(params.id));
        return () => {
            dispatch(clearSelectedMovie());
        };
    }, [dispatch]);

    const addFavourite = (id: string) => {
        services.userService.addFavouriteMovie(id);
        dispatch(setFavouriteMovie(id));
    };

    const removeFavourite = (id: string) => {
        services.userService.removeFavouriteMovie(id);
        dispatch(removeFavouriteMovie(id));
    };

    const renderRatings = (ratings: Rating[]) => {
        if (ratings && ratings.length > 0) {
            return <Ratings ratings={ratings} />;
        }
        return null;
    };

    const renderDetail = () => {
        if (hasError) {
            return <CustomError title={errorMessage}></CustomError>;
        }
        if (selectedMovie) {
            return (
                <div>
                    <Card className="flex movie-detail-card">
                        <div className="movie-image">
                            <img src={selectedMovie!.Poster} />
                            {isLogged && (
                                <Favourite
                                    isFavourite={selectedMovie.favourite}
                                    add={() =>
                                        addFavourite(selectedMovie.imdbID)
                                    }
                                    remove={() =>
                                        removeFavourite(selectedMovie.imdbID)
                                    }
                                />
                            )}
                        </div>
                        <div className="movie-detail-card-content">
                            <div className="movie-detail-info-header-container">
                                <Typography component="h5" variant="h5">
                                    {selectedMovie.Title}
                                </Typography>
                                <Typography
                                    variant="subtitle1"
                                    color="textSecondary"
                                >
                                    {selectedMovie.Director} (
                                    {selectedMovie.Country}),{" "}
                                    {selectedMovie.Year}
                                </Typography>
                            </div>
                            <Divider />
                            <div className="movie-detail-info-container">
                                <div className="info">
                                    <MovieDetailInfo
                                        label="Genre"
                                        description={selectedMovie.Genre}
                                    />
                                    <MovieDetailInfo
                                        label="Duration"
                                        description={selectedMovie.Runtime}
                                    />
                                    <MovieDetailInfo
                                        label="Released"
                                        description={selectedMovie.Released}
                                    />
                                    <MovieDetailInfo
                                        label="Actors"
                                        description={selectedMovie.Actors}
                                    />
                                    <MovieDetailInfo
                                        label="Awards"
                                        description={selectedMovie.Awards}
                                    />
                                    <MovieDetailInfo
                                        label="Rated"
                                        description={selectedMovie.Rated}
                                    />
                                    <MovieDetailInfo
                                        label="Writer"
                                        description={selectedMovie.Writer}
                                    />
                                    <MovieDetailInfo
                                        label="Language"
                                        description={selectedMovie.Language}
                                    />
                                    <MovieDetailInfo
                                        label="Metascore"
                                        description={selectedMovie.Metascore}
                                    />
                                    <MovieDetailInfo
                                        label="DVD"
                                        description={selectedMovie.DVD}
                                    />
                                    <MovieDetailInfo
                                        label="BoxOffice"
                                        description={selectedMovie.BoxOffice}
                                    />
                                    <MovieDetailInfo
                                        label="Production"
                                        description={selectedMovie.Production}
                                    />
                                    <MovieDetailInfo
                                        label="Website"
                                        description={selectedMovie.Website}
                                    />
                                </div>
                                <div className="info">
                                    {renderRatings(selectedMovie.Ratings)}
                                </div>
                            </div>
                        </div>
                    </Card>
                    <Card className="movie-detail-card-description">
                        <div>
                            <Typography component="h5" variant="h5">
                                Description
                            </Typography>
                        </div>
                        <Divider />
                        <div>
                            <Typography variant="subtitle1" color="textPrimary">
                                {selectedMovie.Plot}
                            </Typography>
                        </div>
                    </Card>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="movie-detail">
            <div>
                <Link to={homeRoute()} className="link">
                    <Button variant="contained" color="primary" size="large">
                        Back to list
                    </Button>
                </Link>
            </div>
            <div>{renderDetail()}</div>
        </div>
    );
};

export default MovieDetail;
