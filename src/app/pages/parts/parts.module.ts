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
import { PartsRoutingModule } from './parts-routing';
import { PartsComponent } from './parts.component';
import { PartListComponent } from './list/part-list.component';
import { PartCreateComponent } from './create/part-create.component';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../@shared/shared.module';
import { CoreModule } from '../../@core/core.module';

@NgModule({
  imports: [
    CommonModule,
    NbActionsModule,
    NbCardModule,
    PartsRoutingModule,
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
    PartsComponent,
    PartListComponent,
    PartCreateComponent,
  ],

})
export class PartsModule { }
