import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  PartSearchComponent,
  TaskSearchComponent,
  DialogTaskAddComponent,
} from './components';

import { TaskService, PartService } from './services';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DeviceDetectorModule } from 'ngx-device-detector';
import { CoreModule } from '../@core/core.module';

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

export const INVENTORY_CORE_PROVIDERS = [
  TaskService,
  PartService,
];

@NgModule({
  imports: [
    CommonModule,
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
    DeviceDetectorModule.forRoot(),
    CoreModule,
  ],
  exports: [
    PartSearchComponent,
    TaskSearchComponent,
    DialogTaskAddComponent,
  ],
  declarations: [
    PartSearchComponent,
    TaskSearchComponent,
    DialogTaskAddComponent,
  ],
  entryComponents: [
    PartSearchComponent,
    TaskSearchComponent,
    DialogTaskAddComponent,
  ],
})
export class InventoryCoreModule {
  constructor(@Optional() @SkipSelf() parentModule: InventoryCoreModule) {
  }

  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: InventoryCoreModule,
      providers: [
        ...INVENTORY_CORE_PROVIDERS,
      ],
    };
  }
}
