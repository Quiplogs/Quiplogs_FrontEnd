import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LocationsComponent } from './locations.component';
import { LocationListComponent } from './list/location-list.component';
import { LocationCreateComponent } from './create/location-create.component';

const routes: Routes = [
  {
    path: '',
    component: LocationsComponent,
    children: [
      {
        path: 'edit/:id',
        component: LocationCreateComponent,
      },
      {
        path: 'create',
        component: LocationCreateComponent,
      },
      {
        path: 'list',
        component: LocationListComponent,
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
  ],
})

export class LocationsRoutingModule {
}
