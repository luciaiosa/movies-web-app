import React, { FunctionComponent, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import {
    getMoviesRequest,
    MovieStore,
    MovieResume,
    setFavouriteMovie,
    removeFavouriteMovie,
    PaginationStore,
    setPaginationEllipseUpperPagesNumber,
    setPaginationSelectedPage,
    setSearchTerm,
} from "../../store/movies";
import { AppStore } from "../../store/app/AppStore";
import { setBreadcrumbs } from "../../store/app";
import SearchBar from "../../components/search-bar/SearchBar";
import { styles } from "./MoviesListStyles";
import Pagination from "../../components/pagination/Pagination";
import CustomError from "../../components/error/Error";
import { useWindowResize } from "../../hooks/useWindowResize";
import settings from "../../appSettings.json";
import services from "../../services";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import StarIcon from "@material-ui/icons/Star";
import { Favourite } from "../favourite/Favourite";

const MoviesList: FunctionComponent = (): JSX.Element => {
    const classes = styles();
    const windowWidth = useWindowResize().width;
    const [gridListColsNumber, setGridListColsNumber] = useState(2);

    /* useSelector is a function that takes the current state as an argument 
    and returns whatever data you want from it. It’s very similiar to mapStateToProps() 
    and it allows to store the return values inside a variable within the scope of the 
    functional components instead of passing down as props */
    const { movies, searchTerm, pages, hasError, errorMessage } = useSelector<
        AppStore,
        MovieStore
    >((state) => state.movieStore);
    const isLogged = useSelector<AppStore, boolean>((state) => state.isLogged);
    const {
        currentPage,
        ellipseUpperPagesNumber,
        ellipseLowerPagesNumber,
    } = useSelector<AppStore, PaginationStore>(
        (state) => state.paginationStore
    );

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getMoviesRequest(currentPage, searchTerm));
        /* dispatch(setBreadcrumbs([])); */
    }, []);

    useEffect(() => {
        setGridListColsNumber(calculateColsNumber(windowWidth));
    }, [windowWidth]);

    useEffect(() => {
        dispatch(getMoviesRequest(currentPage, searchTerm));
    }, [searchTerm]);

    const calculateColsNumber = (windowWidth: number) => {
        switch (true) {
            case windowWidth <= 620:
                return 1;
            case windowWidth > 620 && windowWidth <= 900:
                return 2;
            case windowWidth > 900 && windowWidth <= 1200:
                return 3;
            case windowWidth > 1200 && windowWidth <= 1500:
                return 4;
            default:
                return 5;
        }
    };

    const getHeaderClass = (windowWidth: number) => {
        return windowWidth < 990
            ? classes.pageHeaderMobile
            : classes.pageHeader;
    };

    const onSearchBarValueChange = (value: string) => {
        dispatch(setSearchTerm(value));
    };

    const onCurrentPageChange = (value: number) => {
        dispatch(setPaginationSelectedPage(value));
        dispatch(getMoviesRequest(value, searchTerm));
    };

    const pageNumbers = (): Array<number> => {
        const pageNumbers = [];
        for (let i = 1; i <= pages; i++) {
            pageNumbers.push(i);
        }
        return pageNumbers;
    };

    const addFavourite = (id: string) => {
        services.userService.addFavouriteMovie(id);
        dispatch(setFavouriteMovie(id));
    };

    const removeFavourite = (id: string) => {
        services.userService.removeFavouriteMovie(id);
        dispatch(removeFavouriteMovie(id));
    };
    const renderList = (): JSX.Element => {
        if (!movies || movies.length === 0) {
            return <CustomError title="Movies not found" />;
        }
        const moviesList = movies.map((movie: MovieResume, index: number) => {
            return (
                <GridListTile key={index}>
                    <img src={movie.Poster} alt={movie.Title} />
                    {isLogged && (
                        <Favourite
                            isFavourite={movie.favourite}
                            add={() => addFavourite(movie.imdbID)}
                            remove={() => removeFavourite(movie.imdbID)}
                        />
                    )}
                    <Link to={`/movies/${movie.imdbID}`}>
                        <GridListTileBar
                            title={movie.Title}
                            subtitle={<span>Year: {movie.Year}</span>}
                        />
                    </Link>
                </GridListTile>
            );
        });
        return (
            <GridList
                cellHeight={550}
                cols={gridListColsNumber}
                className={classes.gridList}
            >
                {moviesList}
            </GridList>
        );
    };

    const renderPagination = (): JSX.Element => {
        if (pages > 1) {
            return (
                <Pagination
                    pageNumbers={pageNumbers()}
                    currentPage={currentPage}
                    ellipseUpperPagesNumber={ellipseUpperPagesNumber}
                    ellipseLowerPagesNumber={ellipseLowerPagesNumber}
                    config={settings.paginationConfig}
                    pageSelected={(value: number) => onCurrentPageChange(value)}
                ></Pagination>
            );
        }
        return <div></div>;
    };

    const renderContent = (): JSX.Element => {
        if (hasError) {
            return <CustomError title={errorMessage}></CustomError>;
        }
        return (
            <div>
                {renderList()}
                {renderPagination()}
            </div>
        );
    };

    return (
        <div className={classes.container}>
            <div className={getHeaderClass(windowWidth)}>
                <div>
                    <h2 className={classes.pageHeaderTitle}>Movies list</h2>
                </div>

                <SearchBar
                    searchTerm={searchTerm}
                    onSearchValueChange={(value) =>
                        onSearchBarValueChange(value)
                    }
                />
            </div>
            {renderContent()}
        </div>
    );
};

export default MoviesList;
