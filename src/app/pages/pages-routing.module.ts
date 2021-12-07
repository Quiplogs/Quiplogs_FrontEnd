import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'dashboard',
      component: DashboardComponent,
    },
    {
      path: 'workorders',
      loadChildren: () => import('./workorders/workorder.module')
        .then(m => m.WorkOrderModule),
    },
    {
      path: 'assets',
      loadChildren: () => import('./assets/assets.module')
        .then(m => m.AssetsModule),
    },
    {
      path: 'parts',
      loadChildren: () => import('./parts/parts.module')
        .then(m => m.PartsModule),
    },
    {
      path: 'locations',
      loadChildren: () => import('./locations/locations.module')
        .then(m => m.LocationsModule),
    },
    {
      path: 'users',
      loadChildren: () => import('./users/users.module')
        .then(m => m.UsersModule),
    },
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
