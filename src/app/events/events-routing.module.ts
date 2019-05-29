import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserCalendarComponent} from './components/user-calendar/user-calendar.component';
import {AuthenticationGuard} from '../authentication/authentication.guard';
import {UserAvailabilityComponent} from './components/user-availability/user-availability.component';
import {UserRole} from '../users/_models/user';

const routes: Routes = [
  {
    path: '',
    component: UserCalendarComponent,
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
    path: 'user/:userId',
    component: UserAvailabilityComponent,
    data: {
      roles: [
        UserRole.ROLE_ORGANIZER,
        UserRole.ROLE_ADMIN
      ]
    }
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class EventsRoutingModule {
}
