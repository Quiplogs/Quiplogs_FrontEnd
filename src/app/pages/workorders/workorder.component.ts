import { Component } from '@angular/core';

@Component({
  selector: 'ngx-work-orders',
  template: `
      <div class="row">
      <div class="col-ms-12 col-md-12 col-lg-12">
          <nb-card class="actions-card">
              <nb-card-header>
                Manage Work Orders
              </nb-card-header>
              <nb-card-body>
                  <nb-actions size="medium" fullWidth>
                    <nb-action class="action" routerLink="/workorders/list">
                        <nb-icon class="action-icon icon" icon="menu-outline"></nb-icon>
                        <span>List</span>
                    </nb-action>
                    <nb-action class="action" routerLink="/workorders/create">
                        <nb-icon class="action-icon icon" icon="plus-square-outline"></nb-icon>
                        <span>Create</span>
                    </nb-action>
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
export class WorkOrderComponent {
}
