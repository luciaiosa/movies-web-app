export class StorageService {
    private sessionStorageAvailable : boolean = typeof sessionStorage != "undefined";
    private localStorageAvailable : boolean = typeof localStorage != "undefined";

    saveSessionStorage(key: string, data: any){
        if (this.sessionStorageAvailable) {
            console.log(data);
            sessionStorage.setItem(key, JSON.stringify(data));
          }
    }

    removeSessionStorage(key: string) {
        if (this.sessionStorageAvailable) {
          sessionStorage.removeItem(key);
        }
    }

    getFromLocalStorage =(key: string) => {
        if (this.localStorageAvailable){
            var value = localStorage.getItem(key);
            return value ?? [];
        }
        return [];
    }

    saveLocalStorage = (key: string, data: any) => {
        if (this.localStorageAvailable) {
            localStorage.setItem(key, JSON.stringify(data));
        }
    }
}

