import axios, { AxiosInstance } from "axios";
import settings from '../appSettings.json';


class AxiosClient {
    public baseUrl: string;
    public instance: AxiosInstance;

    constructor(){
        this.instance = axios.create({
            baseURL: settings.omdbApi.url
        })
        this.baseUrl = settings.omdbApi.url;
    }
}

//Class singleton
export default new AxiosClient();