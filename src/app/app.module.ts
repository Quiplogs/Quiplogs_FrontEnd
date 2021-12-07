import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CoreModule } from './@core/core.module';
import { ThemeModule } from './@theme/theme.module';
import { AssetCoreModule } from './@asset-core/asset-core.module';
import { InventoryCoreModule } from './@invetnory-core/inventory-core.module';
import { WorkOrderCoreModule } from './@workorder-core/workorder-core.module';
import { ScheduleModule } from './@schedule/schedule.module';
import { DashboardModule } from './@dashboard/dashboard.module';
import { PlannedMaintenanceModule } from './@planned-maintenance/planned-maintenance.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthGuard } from '../app/@core/gaurds/auth-guard.service';
import { NbAuthJWTInterceptor, NB_AUTH_TOKEN_INTERCEPTOR_FILTER } from '@nebular/auth';

import {
  NbChatModule,
  NbDatepickerModule,
  NbDialogModule,
  NbCardModule,
  NbMenuModule,
  NbSidebarModule,
  NbToastrModule,
  NbWindowModule,
} from '@nebular/theme';

import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './@shared/shared.module';
import { DialogTaskAddComponent } from './@invetnory-core/components';
import { DialogDeleteComponent } from './@shared/components';
import { GridFilterComponent } from './@core/components';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule.forRoot(),
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbCardModule,
    NgxUiLoaderModule,
    FormsModule,
    ReactiveFormsModule,
    NbDatepickerModule.forRoot(),
    NbDialogModule.forRoot(),
    NbWindowModule.forRoot(),
    NbToastrModule.forRoot(),
    NbChatModule.forRoot({
      messageGoogleMapKey: 'AIzaSyA_wNuCzia92MAmdLRzmqitRGvCF7wCZPY',
    }),
    DashboardModule.forRoot(),
    CoreModule.forRoot(),
    ThemeModule.forRoot(),
    AssetCoreModule.forRoot(),
    InventoryCoreModule.forRoot(),
    WorkOrderCoreModule.forRoot(),
    ScheduleModule.forRoot(),
    PlannedMaintenanceModule.forRoot(),
  ],
  providers: [
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: NbAuthJWTInterceptor, multi: true },
    { provide: NB_AUTH_TOKEN_INTERCEPTOR_FILTER, useValue: req => false },
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    DialogDeleteComponent,
    DialogTaskAddComponent,
  ],
})
export class AppModule {
}
