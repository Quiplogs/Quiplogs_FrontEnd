import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { throwIfAlreadyLoaded } from './module-import-gaurd';
import { ChartModule } from 'angular2-chartjs';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

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

export const WORKORDER_CORE_PROVIDERS = [

];

@NgModule({
  imports: [
    ChartModule,
    NgxChartsModule,
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
    NgxUiLoaderModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  exports: [
  ],
  declarations: [
  ],
  entryComponents: [

    ],
})
export class WorkOrderCoreModule {
  constructor(@Optional() @SkipSelf() parentModule: WorkOrderCoreModule) {
  }

  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: WorkOrderCoreModule,
      providers: [
        ...WORKORDER_CORE_PROVIDERS,
      ],
    };
  }
}
