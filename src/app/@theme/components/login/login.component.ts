import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NbAuthResult, NbAuthService, NbLoginComponent, NB_AUTH_OPTIONS } from '@nebular/auth';
import { LocalStorageService } from '../../../@core/services';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
})
export class LoginComponent extends NbLoginComponent {

  private redirectUrl;

  constructor(
    service: NbAuthService,
    @Inject(NB_AUTH_OPTIONS) options: {},
    cd: ChangeDetectorRef, router: Router,
    private localStorageService: LocalStorageService) {
    super(service, options, cd, router);
  }

  login(): void {
    this.errors = [];
    this.messages = [];
    this.submitted = true;

    this.service.authenticate(this.strategy, this.user).subscribe((result: NbAuthResult) => {
      this.submitted = false;

      if (result.isSuccess()) {
        this.messages = result.getMessages();
      } else {
        this.errors = result.getErrors();
      }

      this.redirectUrl = this.localStorageService.getLoginUrl();
      setTimeout(() => {
        this.localStorageService.removeLoginUrl();
        return this.router.navigateByUrl(this.redirectUrl);
      }, this.redirectDelay);

      this.cd.detectChanges();
    });
  }
}
