import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root"
})
export class LocalStorageService {

    private storageFallback = "";
    private isLocalStorageAvailable = false;

    constructor() {
        this.isLocalStorageAvailable = this.isStorageSupported();
    }

    setItem(key: string, value: string) {
        if (this.isLocalStorageAvailable) {
            localStorage.setItem(key, value);
        } else {
            this.storageFallback[key] = value;
        }
    }

    getItem(key: string) {
        if (this.isLocalStorageAvailable) {
            return localStorage.getItem(key);
        } else {
            return this.storageFallback[key];
        }
    }

    private isStorageSupported() {
        try {
            localStorage.setItem("test", "test");
            localStorage.removeItem("test");
            return true;
        } catch (e) {
            return false;
        }
    }

}
