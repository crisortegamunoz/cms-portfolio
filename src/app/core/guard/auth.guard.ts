import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { TokenService } from '@core/service/authentication/token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard  {
  constructor(private tokenService: TokenService, private router: Router) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.tokenService.getToken()) {
      return true;
    }
    this.router.navigate(['/authentication/signin']);
    return false;
  }
}
