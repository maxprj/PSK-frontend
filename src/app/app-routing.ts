import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login';
import {HomeComponent} from './home/home.component';
import {AuthGuard} from './_guards/auth.guard';

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

export const routing = RouterModule.forRoot(appRoutes);
