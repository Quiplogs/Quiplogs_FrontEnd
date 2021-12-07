import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UsersComponent } from './users.component';
import { UserListComponent } from './list/user-list.component';
import { UserEditComponent } from './edit/user-edit.component';

const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
    children: [
      {
        path: 'edit/:id',
        component: UserEditComponent,
      },
      {
        path: 'create',
        component: UserEditComponent,
      },
      {
        path: 'list',
        component: UserListComponent,
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

export class UsersRoutingModule {
}
