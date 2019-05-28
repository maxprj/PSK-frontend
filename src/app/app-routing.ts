import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './authentication/login';
import {AuthenticationGuard} from './authentication/authentication.guard';
import { PasswordChangeComponent } from './authentication/password-change/password-change.component';
import { NavComponent } from './core/layout-components/nav/nav.component';
import { UserRole } from './users/_models/enums/UserRoleEnum';
import { ErrorPageComponent } from './error-page/error-page.component';

const appRoutes: Routes = [
  { path: '', component: NavComponent, canActivate: [AuthenticationGuard],
    children: [
      { path: 'events', loadChildren: 'src/app/events/events.module#EventsModule', data: {roles: [UserRole.ROLE_USER, UserRole.ROLE_ORGANIZER, UserRole.ROLE_ADMIN] } },
      { path: 'users', loadChildren: 'src/app/users/users.module#UsersModule', data: {roles: [UserRole.ROLE_ADMIN] } },
      { path: 'apartments', loadChildren: 'src/app/apartments/apartments.module#ApartmentsModule', data: {roles: [UserRole.ROLE_ADMIN] } },
      { path: 'trips', loadChildren: 'src/app/trips/trips.module#TripsModule', data: {roles: [UserRole.ROLE_ORGANIZER, UserRole.ROLE_ADMIN] } },
      { path: 'error', component: ErrorPageComponent },
  ]},
  { path: 'login', component: LoginComponent },
  { path: 'user/changePassword', component: PasswordChangeComponent },
  { path: '**', redirectTo: '', canActivate: [AuthenticationGuard]},

];

export const routing = RouterModule.forRoot(appRoutes);
