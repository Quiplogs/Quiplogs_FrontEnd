import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2ImgMaxModule } from 'ng2-img-max';
import {
  DialogDeleteComponent,
  ImageUploadComponent,
  TinyMCEComponent,
} from './components';

import { DeviceDetectorModule } from 'ngx-device-detector';

import {
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
  NbToastrModule,
} from '@nebular/theme';

import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CoreModule } from '../@core/core.module';

export const SHARED_PROVIDERS = [
];

@NgModule({
    imports: [
        NbActionsModule,
        NbAlertModule,
        CommonModule,
        NbDialogModule,
        Ng2ImgMaxModule,
        NbCardModule,
        NbButtonModule,
        NbInputModule,
        NbIconModule,
        NgxUiLoaderModule,
        NbDatepickerModule,
        FormsModule,
        ReactiveFormsModule,
        NbAccordionModule,
        NbCheckboxModule,
        NbRadioModule,
        NbSelectModule,
        NbTooltipModule,
        NbListModule,
        RouterModule,
        NbTabsetModule,
        NbStepperModule,
        NbToastrModule.forRoot(),
        DeviceDetectorModule.forRoot(),
        CoreModule,
    ],
    exports: [
        ImageUploadComponent,
        DialogDeleteComponent,
    ],
    declarations: [
        ImageUploadComponent,
        DialogDeleteComponent,
        TinyMCEComponent,
    ]
})
export class SharedModule {
  constructor(@Optional() @SkipSelf() parentModule: SharedModule) {
  }

  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: SharedModule,
      providers: [
        ...SHARED_PROVIDERS,
      ],
    };
  }
}
