import {RouterModule, Routes} from '@angular/router';
import {AuthenticationGuard} from '../authentication/authentication.guard';
import {NgModule} from '@angular/core';
import {TripListComponent} from './trip-list/trip-list.component';
import {TripAddComponent} from './trip-add/trip-add.component';
import {TripDetailsComponent} from './trip-details/trip-details.component';
import {TripUserViewComponent} from "./trip-user-view/trip-user-view.component";

const routes: Routes = [
  { path: '', component: TripListComponent, canActivate: [AuthenticationGuard]},
  { path: 'add', component: TripAddComponent, canActivate: [AuthenticationGuard]},
  { path: ':tripId', component: TripDetailsComponent, canActivate: [AuthenticationGuard]},
  { path: 'user', component: TripUserViewComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TripsRoutingModule { }
