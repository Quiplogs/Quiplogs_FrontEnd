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
} from '@nebular/theme';
import { UsersRoutingModule } from './users-routing';
import { UsersComponent } from './users.component';
import { UserListComponent } from './list/user-list.component';
import { UserEditComponent } from './edit/user-edit.component';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../@shared/shared.module';
import { CoreModule } from '../../@core/core.module';

@NgModule({
  imports: [
    CommonModule,
    NbActionsModule,
    NbCardModule,
    UsersRoutingModule,
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
    UsersComponent,
    UserListComponent,
    UserEditComponent,
  ],

})
export class UsersModule { }
