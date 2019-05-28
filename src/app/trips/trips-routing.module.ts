import {RouterModule, Routes} from '@angular/router';
import {AuthenticationGuard} from '../authentication/authentication.guard';
import {NgModule} from '@angular/core';
import {TripListComponent} from './trip-list/trip-list.component';
import {TripAddComponent} from './trip-add/trip-add.component';
import {TripDetailsComponent} from './trip-details/trip-details.component';

const routes: Routes = [
  { path: 'trips', component: TripListComponent, canActivate: [AuthenticationGuard]},
  { path: 'trips/add', component: TripAddComponent, canActivate: [AuthenticationGuard]},
  { path: 'trips/:tripId', component: TripDetailsComponent, canActivate: [AuthenticationGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TripsRoutingModule { }
