import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbAuthModule, NbPasswordAuthStrategy, NbAuthJWTToken } from '@nebular/auth';
import { NbSecurityModule, NbRoleProvider } from '@nebular/security';
import { RoleProvider } from './utils/role-provider';

import { ApiEndpointsService } from './services/api-endpoint.service';
import { AnalyticsService, ToastrAlertService } from './utils';

import {
  UserLoginService,
  LocationService,
  UserService,
  BlobService,
  LocalStorageService,
  ApiMessageHandlerService,
} from './services';

import {
  GridFilterComponent,
} from './components';

import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

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
  NbToastrModule,
  NbStepperModule,
} from '@nebular/theme';
import { AppSettings } from './data/constants';

export const NB_CORE_PROVIDERS = [
  ...NbAuthModule.forRoot({

    strategies: [
      NbPasswordAuthStrategy.setup({
        name: 'email',
         baseEndpoint: AppSettings.API_ENDPOINT,
        token: {
          class: NbAuthJWTToken,
          key: 'authToken',
        },
        login: {
          endpoint: '/auth/login',
          method: 'post',
          redirect: {
            success: 'dashboard/',
            failure: null,
          },
        },
        logout: {
          endpoint: '',
        },
        register: {
          endpoint: '/register/user',
          method: 'post',
        },
      }),
    ],
    forms: {
    },
  }).providers,

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
        parent: 'superadmin',
        create: 'news',
        remove: '*',
      },
    },
  }).providers,
  {
    provide: NbRoleProvider, useClass: RoleProvider,
  },
  AnalyticsService,
  UserLoginService,
  ApiEndpointsService,
  LocationService,
  ToastrAlertService,
  UserService,
  BlobService,
  LocalStorageService,
  ApiMessageHandlerService,
];

@NgModule({
    imports: [
        NbActionsModule,
        NbAlertModule,
        CommonModule,
        NbDialogModule,
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
    ],
    exports: [
        NbAuthModule,
        GridFilterComponent,
    ],
    declarations: [
        GridFilterComponent,
    ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
  }

  static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [
        ...NB_CORE_PROVIDERS,
      ],
    };
  }
}
