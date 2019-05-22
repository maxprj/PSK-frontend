import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './authentication/login';
import {HomeComponent} from './home/home.component';
import {AuthenticationGuard} from './authentication/authentication.guard';
import {ApartmentsListComponent} from './apartments/apartments-list/apartments-list.component';
import {ApartmentsDetailsComponent} from './apartments/apartments-details/apartments-details.component';

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [AuthenticationGuard] },
  { path: 'apartments', component: ApartmentsListComponent, canActivate: [AuthenticationGuard]},
  { path: 'test', component: ApartmentsDetailsComponent, canActivate: [AuthenticationGuard]},
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'apartments', pathMatch: 'full' }
];

export const routing = RouterModule.forRoot(appRoutes);
