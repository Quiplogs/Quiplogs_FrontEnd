import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AssetComponent } from './assets.component';
import { AssetCreateComponent } from './create/asset-create.component';
import { AssetEditComponent } from './edit/asset/asset.component';
import { AssetEditHeaderComponent } from './edit/asset-edit.component';
import { AssetListComponent } from './list/asset-list.component';
import { WorkOrderHistoryComponent } from './edit/workorder-history/workorder-history.component';

const routes: Routes = [
  {
    path: '',
    component: AssetComponent,
    children: [
      {
        path: 'edit/:id',
        component: AssetEditHeaderComponent,
        children: [
          {
            path: '',
            component: AssetEditComponent,
          },
          {
            path: 'work-order',
            component: WorkOrderHistoryComponent,
          },
        ],
      },
      {
        path: 'create',
        component: AssetCreateComponent,
      }, {
        path: 'list',
        component: AssetListComponent,
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

export class AssetsRoutingModule {
}
