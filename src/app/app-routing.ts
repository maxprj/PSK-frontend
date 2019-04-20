import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login';
import {HomeComponent} from './home/home.component';
import {AuthGuard} from './_guards/auth.guard';

const appRoutes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
