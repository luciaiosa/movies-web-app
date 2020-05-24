import axiosClient from './axiosClient';
import { MoviesClient } from './movieClient';
import settings from '../appSettings.json';
import { StorageService } from './storageService';
import { AuthService } from './authServices';
import { UserService } from './userService';

const  moviesClient = new MoviesClient(axiosClient.instance, settings.omdbApi.apiKey);
const storageService = new StorageService();
const authService = new AuthService();
const userService = new UserService();

export default { moviesClient, storageService, authService, userService }