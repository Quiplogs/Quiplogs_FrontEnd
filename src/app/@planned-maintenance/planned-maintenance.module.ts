import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { throwIfAlreadyLoaded } from './module-import-gaurd';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ScheduleModule } from '../@schedule/schedule.module';
import { RouterModule } from '@angular/router';

import {
  NbDialogModule,
} from '@nebular/theme';

import {
  NbActionsModule,
  NbAlertModule,
  NbCardModule,
  NbButtonModule,
  NbInputModule,
  NbIconModule,
  NbAccordionModule,
  NbDatepickerModule,
  NbCheckboxModule,
  NbRadioModule,
  NbSelectModule,
  NbTooltipModule,
  NbListModule,
  NbTabsetModule,
  NbStepperModule,
} from '@nebular/theme';

import {
  PlannedMaintenanceAccordionComponent,
  PlannedMaintenanceDetailComponent,
  PlannedMaintenanceDetailPartComponent,
  PlannedMaintenanceDetailTaskComponent,
  PlannedMaintenanceInitialComponent,
} from './components';
import { PlannedMaintenancePartService, PlannedMaintenanceService, PlannedMaintenanceTaskService } from './services';

export const PLANNED_MAINTENANCE_PROVIDERS = [
  PlannedMaintenanceService,
  PlannedMaintenancePartService,
  PlannedMaintenanceTaskService,
];

@NgModule({
    imports: [
        CommonModule,
        NbDialogModule,
        NbActionsModule,
        NbAlertModule,
        NbCardModule,
        NbButtonModule,
        NbInputModule,
        NbIconModule,
        NbAccordionModule,
        NbDatepickerModule,
        NbCheckboxModule,
        NbRadioModule,
        NbSelectModule,
        NbTooltipModule,
        NbListModule,
        NbTabsetModule,
        NbStepperModule,
        FormsModule,
        ReactiveFormsModule,
        ScheduleModule,
        RouterModule,
    ],
    exports: [
        PlannedMaintenanceInitialComponent,
        PlannedMaintenanceAccordionComponent,
        PlannedMaintenanceDetailComponent,
        PlannedMaintenanceDetailPartComponent,
        PlannedMaintenanceDetailTaskComponent,
    ],
    declarations: [
        PlannedMaintenanceInitialComponent,
        PlannedMaintenanceAccordionComponent,
        PlannedMaintenanceDetailComponent,
        PlannedMaintenanceDetailPartComponent,
        PlannedMaintenanceDetailTaskComponent,
    ]
})
export class PlannedMaintenanceModule {
  constructor(@Optional() @SkipSelf() parentModule: PlannedMaintenanceModule) {
  }

  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: PlannedMaintenanceModule,
      providers: [
        ...PLANNED_MAINTENANCE_PROVIDERS,
      ],
    };
  }
}
