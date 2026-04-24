import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpErrorResponse,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { Router } from "@angular/router";
import { WebStorageService } from "./web-storage.service";
import { ToastrService } from "ngx-toastr";

@Injectable({
  providedIn: "root",
})
export class AuthInterceptorService implements HttpInterceptor {
  private isExpired: boolean = false;

  constructor(private router: Router, private session: WebStorageService, private toaster: ToastrService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let adminData = sessionStorage.getItem("curve-restaurants");
    var token;
    if (adminData && adminData != "undefined") {
      token = JSON.parse(adminData).accessToken;
    } else {
      token = "";
    }

    const copiedReq = req.clone({
      setHeaders: {
        accesstoken: token,
      },
    });

    return next.handle(copiedReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error?.status == 401 && !this.isExpired) {
          this.isExpired = true;
          setTimeout(() => {
            this.toaster.error("Session expired, Please login again");
            sessionStorage.removeItem("curve-restaurants");
            this.router.navigate(["/login"]);
          }, 100); // Delay of 100ms, adjust if necessary
        }
        return throwError(error);
      })
    );
  }
}

