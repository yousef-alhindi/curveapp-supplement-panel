import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class WebStorageService {
  constructor() {}

  setSessionStorage(key: any, value: any) {
    sessionStorage.setItem(key, value);
  }

  getSessionStorage(value: any) {
   return sessionStorage.getItem((value));
  }
}
