import { NgModule } from '@angular/core';
import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbTabsetModule,
  NbUserModule,
  NbRadioModule,
  NbSelectModule,
  NbListModule,
  NbIconModule,
} from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';
import { DashboardComponent } from './dashboard.component';
import { DashboardTextHeaderComponent } from './textheader/textheader.component';
import { NgxEchartsModule } from 'ngx-echarts';

import { RouterModule } from '@angular/router';

import { BarGraphTotalMaintenanceCompletedComponent } from './bargraph/totalmaintenancecompleted.component';
import { DashboardWorkOrderOpenListComponent } from './workorder/workorderopenlist.component';
import { PriorityChartComponent } from './piechart/priority-chart.component';
import { PlannedUnplannedChartComponent } from './piechart/planned-unplanned.component';

@NgModule({
  imports: [
    NbCardModule,
    NbActionsModule,
    NbButtonModule,
    NbCardModule,
    NbTabsetModule,
    NbUserModule,
    NbRadioModule,
    NbSelectModule,
    NbListModule,
    NbIconModule,
    ThemeModule,
    RouterModule,
    NgxEchartsModule,
  ],
  declarations: [
    DashboardComponent,
    DashboardTextHeaderComponent,
    BarGraphTotalMaintenanceCompletedComponent,
    DashboardWorkOrderOpenListComponent,
    PriorityChartComponent,
    PlannedUnplannedChartComponent,
  ],
})
export class DashboardModule { }
