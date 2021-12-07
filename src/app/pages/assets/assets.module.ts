import { NgModule } from '@angular/core';
import { NbSecurityModule } from '@nebular/security';
import { ChartModule } from 'angular2-chartjs';
import { NgxChartsModule } from '@swimlane/ngx-charts';

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
  NbAlertModule,
  NbUserModule,
  NbStepperModule,
  NbAccordionModule,
} from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';
import { AssetsRoutingModule } from './assets-routing';
import { AssetCreateComponent } from './create/asset-create.component';
import { AssetListComponent } from './list/asset-list.component';
import { AssetComponent } from './assets.component';
import { AssetEditComponent } from './edit/asset/asset.component';
import { AssetEditHeaderComponent } from './edit/asset-edit.component';
import { WorkOrderHistoryComponent } from './edit/workorder-history/workorder-history.component';
import { FormsModule as ngFormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { SharedModule } from '../../@shared/shared.module';
import { CoreModule } from '../../@core/core.module';
import { AssetCoreModule } from '../../@asset-core/asset-core.module';
import { PlannedMaintenanceModule } from '../../@planned-maintenance/planned-maintenance.module';
import { WorkOrderCoreModule } from '../../@workorder-core/workorder-core.module';
import {
  ChartsWorkOrderHistoryComponent,
  ChartsWorkDoneComponent,
} from '../../@workorder-core/components/charts/pie';

@NgModule({
  imports: [
    ChartModule,
    NgxChartsModule,
    ThemeModule,
    NbInputModule,
    NbCardModule,
    NbButtonModule,
    NbActionsModule,
    NbUserModule,
    NbCheckboxModule,
    NbRadioModule,
    NbDatepickerModule,
    NbAlertModule,
    AssetsRoutingModule,
    NbSelectModule,
    NbIconModule,
    ngFormsModule,
    ReactiveFormsModule,
    NgxUiLoaderModule,
    SharedModule,
    NbStepperModule,
    NbAccordionModule,
    CoreModule,
    PlannedMaintenanceModule,
    AssetCoreModule,
    WorkOrderCoreModule,
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
    AssetComponent,
    AssetEditHeaderComponent,
    AssetCreateComponent,
    AssetEditComponent,
    AssetListComponent,
    WorkOrderHistoryComponent,
    ChartsWorkOrderHistoryComponent,
    ChartsWorkDoneComponent,
  ],
})
export class AssetsModule { }
