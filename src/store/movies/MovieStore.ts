import settings from "../../appSettings.json";

export interface Rating {
    Source: string;
    Value: string;
}

export interface MovieResume {
    imdbID: string;
    Title: string;
    Year: number;
    Poster: string;
    favourite: boolean;
}

export interface Pagination {
    selectedPage: number;
    ellipseUpperPagesNumber: number;
    ellipseLowerPagesNumber: number;
}

export interface MovieDetail {
    Title: string;
    Year: number;
    Rated: string;
    Released: string;
    Runtime: string;
    Genre: string;
    Director: string;
    Writer: string;
    Actors: string;
    Plot: string;
    Language: string;
    Country: string;
    Awards: string;
    Poster: string;
    Ratings: Rating[];
    Metascore: number;
    imdbRating: number;
    imdbVotes: number;
    imdbID: string;
    Type: string;
    DVD: string;
    BoxOffice: string;
    Production: string;
    Website: string;
    Response: string;
    favourite: boolean;
}

export interface MovieStore {
    readonly loading: boolean;
    readonly pages: number;
    readonly movies: MovieResume[];
    readonly selectedMovie: MovieDetail | undefined;
    readonly hasError: boolean;
    readonly errorMessage: string;
}

export const InitialMovieStore: MovieStore = {
    loading: false,
    pages: 1,
    movies: [],
    selectedMovie: undefined,
    hasError: false,
    errorMessage: "",
};

export interface PaginationStore {
    readonly currentPage: number;
    readonly ellipseUpperPagesNumber: number;
    readonly ellipseLowerPagesNumber: number;
}

export const InitialPaginationStore: PaginationStore = {
    currentPage: 1,
    ellipseUpperPagesNumber: settings.paginationConfig.showPagesNumber,
    ellipseLowerPagesNumber: 0,
};
