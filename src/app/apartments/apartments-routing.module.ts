import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ApartmentsDetailsComponent} from './apartments-details/apartments-details.component';
import {AuthenticationGuard} from '../authentication/authentication.guard';
import {ApartmentsListComponent} from './apartments-list/apartments-list.component';

const routes: Routes = [
  { path: '', component: ApartmentsListComponent, canActivate: [AuthenticationGuard]},
  { path: ':apartmentId/details', component: ApartmentsDetailsComponent, canActivate: [AuthenticationGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApartmentsRoutingModule { }
