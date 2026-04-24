import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment.development";
import { Observable } from "rxjs";
@Injectable({
  providedIn: "root",
})
export class ApiService {
  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) {}

  post(url: any, data: any): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/api/v1/supplement/auth/${url}`,
      data
    );
  }

  put(url: any, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/api/v1/supplement/auth/${url}`, data);
  }

  postcommon(url: any, data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/admin/${url}`, data);
  }

  delete(url: any, data: any): Observable<any> {
    return this.http.delete(`${this.baseUrl}/api/admin/${url}`, { body: data });
  }
  delete1(url: any): Observable<any> {
    return this.http.delete(`${this.baseUrl}/api/v1/supplement/${url}`);
  }

  patch(url: any, data: any): Observable<any> {
    return this.http.patch(`${this.baseUrl}/api/admin/${url}`, data);
  }
  get(url: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/v1/supplement/auth/${url}`);
  }
  patch1(url: any,data:any): Observable<any> {
    return this.http.patch(`${this.baseUrl}/api/v1/supplement/${url}`,data);
  }
  get1(url: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/v1/supplement/${url}`);
  }
  post1(url: any, data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/v1/supplement/${url}`, data);
  }
  put1(url: any, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/api/v1/supplement/${url}`, data);
  }

  isLogin() {
    var token;
    token = sessionStorage.getItem("curve-restaurants");
    if (token) return true;
    else return false;
  }

  preventWrongPriceInput(event: any) {
    const inputValue = event.target.value;
    const charCode = event.which || event.keyCode;

    if ((charCode >= 48 && charCode <= 57) || charCode == 8 || charCode == 46) {
      if (inputValue === '' && charCode == 48) {
        event.preventDefault();
      } else if (inputValue === '0' && charCode != 46) {
        event.preventDefault();
      } else if (inputValue.indexOf('.') !== -1 && charCode == 46) {
        event.preventDefault();
      } else {
        const parts = inputValue.split('.');
        if (parts.length > 1 && parts[1].length >= 2 && charCode != 8) {
          event.preventDefault();
        }
      }
    } else {
      event.preventDefault();
    }
  }

  validateInput(inputField:HTMLInputElement) {
    // Get the input value to prevent multiple spaces
    const inputValue = inputField.value;
  
    // Check if there are more than one blank spaces
    const hasMultipleSpaces = inputValue.match(/\s\s+/);
  
    // If multiple spaces are found, show an error message
    if (hasMultipleSpaces) {
      inputField.value = inputValue.replace(/\s\s+/, " "); // Replace multiple spaces with a single space
      return false; // Prevent form submission
    }
  
    // If no multiple spaces are found, return true to allow form submission
    return true;
  }

  allowOnlyNumbers(event: KeyboardEvent) {
    const charCode = event.charCode;
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
    }
  }

  isValidEmail(email:string) {
    // Regular expression to validate an email
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
    return emailRegex.test(email);
  }

}
