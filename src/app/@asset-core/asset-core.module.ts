import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { throwIfAlreadyLoaded } from './module-import-guard';
import { CommonModule } from '@angular/common';
import { AssetService, AssetUsageService } from './services';

import { CaptureHoursComponent, AssetSearchComponent } from './components';

import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
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

export const ASSET_CORE_PROVIDERS = [
  AssetService,
  AssetUsageService,
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
    CoreModule,
  ],
  exports: [
    CaptureHoursComponent,
    AssetSearchComponent,
  ],
  declarations: [
    CaptureHoursComponent,
    AssetSearchComponent,
  ],
  entryComponents: [
    CaptureHoursComponent,
    AssetSearchComponent,
  ],
})
export class AssetCoreModule {
  constructor(@Optional() @SkipSelf() parentModule: AssetCoreModule) {
  }

  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: AssetCoreModule,
      providers: [
        ...ASSET_CORE_PROVIDERS,
      ],
    };
  }
}
