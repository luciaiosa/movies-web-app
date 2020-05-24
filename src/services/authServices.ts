import users from './mockData/users.json';
import services from './index';

interface User {
    id: number;
    email: string;
}

export class AuthService {
    logIn(email: string, password: string): boolean{
        const user = users.find(user=> user.email === email && user.password === password);
        if (user){
            services.storageService.saveSessionStorage("authUser",{id: user.id, email: user.email});
        }
        return user !== undefined;
    }

    logout(){
        services.storageService.removeSessionStorage("authUser");
    }

    isLogged(){
        return sessionStorage.getItem("authUser") !== null;
    }

    userInfo() {
        const storageValue = sessionStorage.getItem("authUser");
        if(storageValue){
            return JSON.parse(storageValue);
        }
        return null;
    }
}