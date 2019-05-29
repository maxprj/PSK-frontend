import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserListComponent} from './components/user-list/user-list.component';
import {UserOrganizerViewComponent} from "./components/user-organizer-view/user-organizer-view.component";


const routes: Routes = [
  {
    path: '',
    component: UserOrganizerViewComponent
  },
  {
    path: 'details',
    component: UserListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule {
}
