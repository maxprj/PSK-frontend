import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './authentication/login';
import {AuthenticationGuard} from './authentication/authentication.guard';
import { PasswordChangeComponent } from './authentication/password-change/password-change.component';
import { NavComponent } from './core/layout-components/nav/nav.component';

const appRoutes: Routes = [
  { path: '', component: NavComponent, canActivate: [AuthenticationGuard],
    children: [
      { path: 'users', loadChildren: 'src/app/users/users.module#UsersModule' },
      { path: 'apartments', loadChildren: 'src/app/apartments/apartments.module#ApartmentsModule' }
  ]},
  { path: 'login', component: LoginComponent },
  { path: 'user/changePassword', component: PasswordChangeComponent },
  { path: '**', redirectTo: '', canActivate: [AuthenticationGuard]},
 
];

export const routing = RouterModule.forRoot(appRoutes);