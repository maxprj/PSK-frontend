import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TripListComponent} from './trip-list/trip-list.component';
import {MatIconModule, MatProgressSpinnerModule} from '@angular/material';
import {SharedModule} from '../shared/shared.module';
import {TripDetailsComponent} from './trip-details/trip-details.component';
import {routing} from '../app-routing';
import {TableModule, WavesModule} from 'angular-bootstrap-md';
import {NgbModalModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AuthenticationModule} from '../authentication/authentication.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TripsRoutingModule} from './trips-routing.module';

@NgModule({
  declarations: [TripListComponent, TripDetailsComponent],
  imports: [
    NgbModule,
    routing,
    NgbModalModule,
    AuthenticationModule,
    TripsRoutingModule,
    MatProgressSpinnerModule,
    MatIconModule,
    ReactiveFormsModule,
    CommonModule,
    TableModule,
    WavesModule,
    FormsModule,
    SharedModule
  ]
})
export class TripsModule { }
