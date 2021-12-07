import { of, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { NbAuthOAuth2Token, NbAuthService } from '@nebular/auth';

@Injectable({
  providedIn: 'root',
})
export class UserLoginService {
  user = { name: 'Quiplogs User' };

  constructor(
    private authService: NbAuthService) {

    this.authService.onTokenChange()
      .subscribe((token: NbAuthOAuth2Token) => {

        if (token.isValid()) {
          this.user.name = token.getPayload().sub;
        }
      });
  }

  getLoggedInUserName(): Observable<any> {

    return of(this.user);
  }
}
