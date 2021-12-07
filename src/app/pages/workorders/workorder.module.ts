import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbSecurityModule } from '@nebular/security';
import { FormsModule } from '@angular/forms';
import {
  NbActionsModule,
  NbCardModule,
  NbButtonModule,
  NbCheckboxModule,
  NbDatepickerModule,
  NbIconModule,
  NbInputModule,
  NbRadioModule,
  NbSelectModule,
  NbUserModule,
  NbTooltipModule,
  NbListModule,
} from '@nebular/theme';
import { WorkOrderRoutingModule } from './workorder-routing';
import { WorkOrderComponent } from './workorder.component';
import { WorkOrderCreateComponent } from './create/workorder-create.component';
import { WorkOrderListOpenComponent } from './list/open/workorder-list-open.component';
import { WorkOrderListInProgressComponent } from './list/inprogress/workorder-list-inprogress.component';
import { WorkOrderListClosedComponent } from './list/closed/workorder-list-closed.component';
import {
  WorkOrderEditComponent,
  WorkOrderPartComponent,
  WorkOrderTaskComponent,
} from './edit';

import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../@shared/shared.module';
import { CoreModule } from '../../@core/core.module';

@NgModule({
  imports: [
    CommonModule,
    NbActionsModule,
    NbCardModule,
    WorkOrderRoutingModule,
    NgxUiLoaderModule,
    NbButtonModule,
    NbCheckboxModule,
    NbDatepickerModule,
    NbIconModule,
    NbInputModule,
    NbRadioModule,
    NbSelectModule,
    NbUserModule,
    ReactiveFormsModule,
    FormsModule,
    NbTooltipModule,
    SharedModule,
    CoreModule,
    NbListModule,
    NbSecurityModule.forRoot({
      accessControl: {
        guest: {
          view: ['news', 'comments'],
        },
        admin: {
          parent: 'guest',
          create: 'comments',
        },
        moderator: {
          parent: 'admin',
          create: 'news',
          remove: '*',
        },
      },
    }),
  ],
  declarations: [
    WorkOrderComponent,
    WorkOrderListOpenComponent,
    WorkOrderListInProgressComponent,
    WorkOrderListClosedComponent,
    WorkOrderEditComponent,
    WorkOrderPartComponent,
    WorkOrderTaskComponent,
    WorkOrderCreateComponent,
  ],

})
export class WorkOrderModule { }
