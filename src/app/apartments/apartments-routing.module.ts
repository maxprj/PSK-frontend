import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ApartmentsDetailsComponent} from './apartments-details/apartments-details.component';
import {AuthenticationGuard} from '../authentication/authentication.guard';
import {ApartmentsListComponent} from './apartments-list/apartments-list.component';
import {UserRole} from '../users/_models/user';
import { ReservationListComponent } from './reservation-list/reservation-list.component';

const routes: Routes = [
  {
    path: '',
    component: ApartmentsListComponent,
    canActivate: [AuthenticationGuard],
    data: {
      roles: [
        UserRole.ROLE_ADMIN,
        UserRole.ROLE_ORGANIZER
      ]
    }
  },
  {
    path: ':apartmentId',
    component: ApartmentsDetailsComponent,
    canActivate: [AuthenticationGuard],
    data: {
      roles: [
        UserRole.ROLE_ADMIN
      ]
    }
  },
  {
    path: ':apartmentId/reservation',
    component: ReservationListComponent,
    canActivate: [AuthenticationGuard],
    data: {
      roles: [
        UserRole.ROLE_ADMIN,
        UserRole.ROLE_ORGANIZER
      ]
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApartmentsRoutingModule { }
