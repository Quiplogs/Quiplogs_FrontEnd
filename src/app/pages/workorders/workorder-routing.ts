import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WorkOrderComponent } from './workorder.component';
import { WorkOrderCreateComponent } from './create/workorder-create.component';
import { WorkOrderListOpenComponent } from './list/open/workorder-list-open.component';
import { WorkOrderListInProgressComponent } from './list/inprogress/workorder-list-inprogress.component';
import { WorkOrderListClosedComponent } from './list/closed/workorder-list-closed.component';
import { WorkOrderEditComponent } from './edit/workorder-edit.component';

const routes: Routes = [
  {
    path: '',
    component: WorkOrderComponent,
    children: [
      {
        path: 'edit/:id',
        component: WorkOrderEditComponent,
      },
      {
        path: 'create',
        component: WorkOrderCreateComponent,
      },
      {
        path: 'list/open',
        component: WorkOrderListOpenComponent,
      },
      {
        path: 'list/inprogress',
        component: WorkOrderListInProgressComponent,
      },
      {
        path: 'list/closed',
        component: WorkOrderListClosedComponent,
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
  ],
})

export class WorkOrderRoutingModule {
}
