import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PartsComponent } from './parts.component';
import { PartListComponent } from './list/part-list.component';
import { PartCreateComponent } from './create/part-create.component';

const routes: Routes = [
  {
    path: '',
    component: PartsComponent,
    children: [
      {
        path: 'edit/:id',
        component: PartCreateComponent,
      },
      {
        path: 'create',
        component: PartCreateComponent,
      },
      {
        path: 'list',
        component: PartListComponent,
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

export class PartsRoutingModule {
}
