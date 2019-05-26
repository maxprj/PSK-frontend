import {RouterModule, Routes} from '@angular/router';
import {AuthenticationGuard} from '../authentication/authentication.guard';
import {NgModule} from '@angular/core';
import {TripListComponent} from './trip-list/trip-list.component';
import {TripAddComponent} from './trip-add/trip-add.component';

const routes: Routes = [
  { path: 'trips', component: TripListComponent, canActivate: [AuthenticationGuard]},
  { path: 'trips/add', component: TripAddComponent, canActivate: [AuthenticationGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TripsRoutingModule { }
