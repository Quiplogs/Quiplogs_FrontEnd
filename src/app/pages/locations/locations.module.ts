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
import { LocationsRoutingModule } from './locations-routing';
import { LocationsComponent } from './locations.component';
import { LocationListComponent } from './list/location-list.component';
import { LocationCreateComponent } from './create/location-create.component';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../@shared/shared.module';
import { CoreModule } from '../../@core/core.module';

@NgModule({
  imports: [
    CommonModule,
    NbActionsModule,
    NbCardModule,
    LocationsRoutingModule,
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
    LocationsComponent,
    LocationListComponent,
    LocationCreateComponent,
  ],

})
export class LocationsModule { }
