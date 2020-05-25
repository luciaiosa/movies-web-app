import services from './index';
export class UserService {
    addFavouriteMovie = (id: string) => {
        const favoriteMovies = this.getFavouriteMovies();
        favoriteMovies.push(id);
        services.storageService.saveLocalStorage('favouriteMovies', favoriteMovies);
    }

    removeFavouriteMovie = (id: string) => {
        const favoriteMovies = this.getFavouriteMovies();
        const favoriteMovieIndex = favoriteMovies.indexOf(id);
        if (favoriteMovieIndex > -1) {
            favoriteMovies.splice(favoriteMovieIndex, 1);
        }
        services.storageService.saveLocalStorage('favouriteMovies', favoriteMovies);
    }

    getFavouriteMovies = (): string[] => {
        var values = services.storageService.getFromLocalStorage("favouriteMovies");
        if (typeof values === "string"){
            return JSON.parse(values);
        }
        return [];
    }
}