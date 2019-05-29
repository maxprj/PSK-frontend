import {RouterModule, Routes} from '@angular/router';
import {AuthenticationGuard} from '../authentication/authentication.guard';
import {NgModule} from '@angular/core';
import {TripListComponent} from './trip-list/trip-list.component';
import {TripAddComponent} from './trip-add/trip-add.component';
import {TripDetailsComponent} from './trip-details/trip-details.component';
import {TripUserViewComponent} from './trip-user-view/trip-user-view.component';
import {UserRole} from '../users/_models/user';

const routes: Routes = [
  {
    path: '',
    component: TripListComponent,
    canActivate: [AuthenticationGuard],
    data: {
      roles: [
        UserRole.ROLE_ORGANIZER,
        UserRole.ROLE_ADMIN
      ]
    }
  },
  {
    path: 'add',
    component: TripAddComponent,
    canActivate: [AuthenticationGuard],
    data: {
      roles: [
        UserRole.ROLE_ORGANIZER,
        UserRole.ROLE_ADMIN
      ]
    }
  },
  {
    path: 'user',
    component: TripUserViewComponent,
    canActivate: [AuthenticationGuard],
    data: {
      roles: [
        UserRole.ROLE_ORGANIZER,
        UserRole.ROLE_ADMIN,
        UserRole.ROLE_USER
      ]
    }
  },
  {
    path: ':tripId',
    component: TripDetailsComponent,
    canActivate: [AuthenticationGuard],
    data: {
      roles: [
        UserRole.ROLE_ORGANIZER,
        UserRole.ROLE_ADMIN,
        UserRole.ROLE_USER
      ]
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TripsRoutingModule { }
