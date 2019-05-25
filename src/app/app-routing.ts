import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './authentication/login';
import {HomeComponent} from './home/home.component';
import {AuthenticationGuard} from './authentication/authentication.guard';
import { PasswordChangeComponent } from './authentication/password-change/password-change.component';

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [AuthenticationGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'user/changePassword', component: PasswordChangeComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

export const routing = RouterModule.forRoot(appRoutes);
