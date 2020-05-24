import { MovieStore, InitialMovieStore, InitialPaginationStore, PaginationStore } from "../movies/MovieStore";

export interface Breadcrumb {
    link: string | null;
    label: string;
    key: string;
}

export interface AppStore {
    breadcrumbs: Breadcrumb[],
    movieStore: MovieStore,
    isLogged: boolean;
    paginationStore: PaginationStore;
}

export const InitialAppStore: AppStore = {
    breadcrumbs: [],
    movieStore: InitialMovieStore,
    isLogged: false,
    paginationStore: InitialPaginationStore,
}