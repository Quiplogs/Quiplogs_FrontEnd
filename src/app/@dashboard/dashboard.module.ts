import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { throwIfAlreadyLoaded } from './module-import-guard';
import { DashboardService } from './services/dashboard.service';

export const DASHBOARD_PROVIDERS = [
    DashboardService,
];

@NgModule({
  imports: [
  ],
  exports: [
  ],
  declarations: [],
})
export class DashboardModule {
  constructor(@Optional() @SkipSelf() parentModule: DashboardModule) {
    throwIfAlreadyLoaded(parentModule, 'DashboardModule');
  }

  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: DashboardModule,
      providers: [
        ...DASHBOARD_PROVIDERS,
      ],
    };
  }
}
