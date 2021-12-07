import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { NbAuthService, NbTokenService } from '@nebular/auth';
import { tap } from 'rxjs/operators';
import { LocalStorageService } from '../services';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private authService: NbAuthService,
    private router: Router,
    private tokenService: NbTokenService,
    private localStorageService: LocalStorageService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const url: string = state.url;
    if (url) {
      this.localStorageService.setLoginUrl(url);
    }

    return this.authService.isAuthenticated()
      .pipe(
        tap(authenticated => {
          if (!authenticated) {
            this.tokenService.clear();
            this.router.navigate(['auth/login']);
          } else {
            return true;
          }
        }),
      );
  }
}
