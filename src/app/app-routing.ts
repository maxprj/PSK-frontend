import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './authentication/login';
import {AuthenticationGuard} from './authentication/authentication.guard';
import {PasswordChangeComponent} from './authentication/password-change/password-change.component';
import {NavComponent} from './core/layout-components/nav/nav.component';
import {UserRole} from './users/_models/user';
import { UnauthGuard } from './authentication/unauth.guard';

const appRoutes: Routes = [
  {
    path: '', component: NavComponent, canActivate: [AuthenticationGuard],
    children: [
      {
        path: 'events',
        loadChildren: 'src/app/events/events.module#EventsModule',
        canActivate: [AuthenticationGuard],
        data: {
          roles: [
            UserRole.ROLE_USER,
            UserRole.ROLE_ORGANIZER,
            UserRole.ROLE_ADMIN
          ]
        }
      },
      {
        path: 'users',
        loadChildren: 'src/app/users/users.module#UsersModule',
        canActivate: [AuthenticationGuard],
        data: {
          roles: [
            UserRole.ROLE_ADMIN,
            UserRole.ROLE_ORGANIZER
          ]
        }
      },
      {
        path: 'apartments',
        loadChildren: 'src/app/apartments/apartments.module#ApartmentsModule',
        canActivate: [AuthenticationGuard],
        data: {
          roles: [
            UserRole.ROLE_ADMIN,
            UserRole.ROLE_ORGANIZER
          ]
        }
      },
      {
        path: 'trips',
        loadChildren: 'src/app/trips/trips.module#TripsModule',
        canActivate: [AuthenticationGuard],
        data: {
          roles: [
            UserRole.ROLE_ORGANIZER,
            UserRole.ROLE_ADMIN,
            UserRole.ROLE_USER
          ]
        }
      }
    ]
  },
  {path: 'login', component: LoginComponent, canActivate: [UnauthGuard]},
  {path: 'user/changePassword', component: PasswordChangeComponent, canActivate: [UnauthGuard]},
  {path: '**', redirectTo: 'login', canActivate: [UnauthGuard]},

];

export const routing = RouterModule.forRoot(appRoutes);
