import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';

import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';
import { NbRoleProvider } from '@nebular/security';
import { LocalStorageService } from '../services/local-storage.service';

@Injectable()
export class RoleProvider implements NbRoleProvider {

  constructor(
    private authService: NbAuthService,
    private localStorageService: LocalStorageService,
    ) { }

  getRole(): Observable<string> {
    return this.authService.onTokenChange()
      .pipe(
        map((token: NbAuthJWTToken) => {

          this.localStorageService.setCompanyId(token.getPayload()['comId']);

          return token.isValid() ? token.getPayload()['rol'] : 'guest';
        }),
      );
  }
}
