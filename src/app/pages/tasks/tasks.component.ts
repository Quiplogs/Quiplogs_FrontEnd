import { Component, OnDestroy } from '@angular/core';
import { DialogTaskAddComponent } from '../../@invetnory-core/components/dialog-task-add/dialog-task-add.component';
import { NbDialogService } from '@nebular/theme';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'ngx-tasks',
  template: `
      <div class="row">
      <div class="col-ms-12 col-md-12 col-lg-12">
          <nb-card class="actions-card">
              <nb-card-header>Manage Tasks</nb-card-header>
              <nb-card-body>
                  <nb-actions size="medium">
                      <nb-action link="list" icon="menu-outline"></nb-action>
                      <nb-action (click)="create($event)" icon="plus-square-outline"></nb-action>
                  </nb-actions>
              </nb-card-body>
          </nb-card>
      </div>
    </div>

    <div class="row">
      <div class="col-ms-12 col-md-12 col-lg-12">
        <div class="loader-container">
          <router-outlet></router-outlet>
        </div>
      </div>
    </div>
  `,
})
export class TasksComponent implements OnDestroy {

  mySubscription: any;

  constructor(
    private dialogService: NbDialogService,
    private router: Router,
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };

    this.mySubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.router.navigated = false;
      }
    });
  }

  create($event) {
    this.dialogService.open(DialogTaskAddComponent, {
      context: {
        id: null,
      },
    }).onClose.subscribe(id => {
      if (id) {
        this.router.navigate(['/tasks/list']);
      }
    });
  }

  ngOnDestroy() {
    if (this.mySubscription) {
      this.mySubscription.unsubscribe();
    }
  }
}
