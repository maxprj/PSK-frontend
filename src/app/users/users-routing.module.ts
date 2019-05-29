import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserListComponent} from './components/user-list/user-list.component';
import {UserOrganizerViewComponent} from './components/user-organizer-view/user-organizer-view.component';
import {UserRole} from './_models/user';


const routes: Routes = [
  {
    path: '',
    component: UserOrganizerViewComponent,
    data: {
      roles: [
        UserRole.ROLE_ORGANIZER,
        UserRole.ROLE_ADMIN,
      ]
    }
  },
  {
    path: 'details',
    component: UserListComponent,
    data: {
      roles: [
        UserRole.ROLE_ADMIN
      ]
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule {
}
