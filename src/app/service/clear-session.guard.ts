import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ClearSessionGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (state.url.includes('/login')) {
      // Clear session storage or local storage
      // sessionStorage.clear();
    }

    // Always return true to allow navigation; handle further conditions if needed
    return true;
  }
}
