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
  NbDialogModule,
} from '@nebular/theme';

import { TasksRoutingModule } from './tasks-routing';
import { TasksComponent } from './tasks.component';
import { TaskListComponent } from './list/task-list.component';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { ReactiveFormsModule  } from '@angular/forms';
import { SharedModule } from '../../@shared/shared.module';
import { CoreModule } from '../../@core/core.module';

@NgModule({
  imports: [
    CommonModule,
    NbActionsModule,
    NbCardModule,
    TasksRoutingModule,
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
    NbDialogModule,
    CoreModule,
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
    TasksComponent,
    TaskListComponent,
  ],
})
export class TasksModule { }
