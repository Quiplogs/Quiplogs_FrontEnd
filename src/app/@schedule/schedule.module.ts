import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { throwIfAlreadyLoaded } from './module-import-gaurd';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { RouterModule } from '@angular/router';

import {
  DialogEditScheduleComponent,
  ScheduleComponent,
} from './components';

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

import { CoreModule } from '../@core/core.module';

import {
  ScheduleCustomService,
  ScheduleDailyService,
  ScheduleWeeklyService,
  ScheduleMonthlyService,
  ScheduleYearlyService,
} from './services';

export const SHARED_PROVIDERS = [
  ScheduleCustomService,
  ScheduleDailyService,
  ScheduleWeeklyService,
  ScheduleMonthlyService,
  ScheduleYearlyService,
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
        NbDatepickerModule.forRoot(),
        NbCheckboxModule,
        NbRadioModule,
        NbSelectModule,
        NbTooltipModule,
        NbListModule,
        NbTabsetModule,
        NbStepperModule,
        FormsModule,
        ReactiveFormsModule,
        NgxUiLoaderModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        CoreModule,
    ],
    exports: [
        ScheduleComponent,
        DialogEditScheduleComponent,
    ],
    declarations: [
        ScheduleComponent,
        DialogEditScheduleComponent,
    ]
})
export class ScheduleModule {
  constructor(@Optional() @SkipSelf() parentModule: ScheduleModule) {
  }

  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: ScheduleModule,
      providers: [
        ...SHARED_PROVIDERS,
      ],
    };
  }
}
