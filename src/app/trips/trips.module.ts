import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TripListComponent} from './trip-list/trip-list.component';
import {MatIconModule, MatProgressSpinnerModule} from '@angular/material';
import {SharedModule} from '../shared/shared.module';
import {TripAddComponent} from './trip-add/trip-add.component';
import {routing} from '../app-routing';
import {CheckboxModule, TableModule, WavesModule} from 'angular-bootstrap-md';
import {NgbModalModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AuthenticationModule} from '../authentication/authentication.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TripsRoutingModule} from './trips-routing.module';
import {UsersModule} from '../users/users.module';

@NgModule({
  declarations: [TripListComponent, TripAddComponent],
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
    CheckboxModule,
    SharedModule,
    UsersModule
  ]
})
export class TripsModule { }
