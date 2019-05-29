import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TripListComponent} from './trip-list/trip-list.component';
import {MatIconModule, MatProgressSpinnerModule} from '@angular/material';
import {SharedModule} from '../shared/shared.module';
import {TripAddComponent} from './trip-add/trip-add.component';
import {CheckboxModule, TableModule, WavesModule} from 'angular-bootstrap-md';
import {NgbModalModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AuthenticationModule} from '../authentication/authentication.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TripsRoutingModule} from './trips-routing.module';
import {TripDetailsComponent} from './trip-details/trip-details.component';
import { TripUserAddModalComponent } from './trip-user-add-modal/trip-user-add-modal.component';
import {OwlDateTimeModule, OwlNativeDateTimeModule} from 'ng-pick-datetime';
import {TripUserAddModalComponent} from './trip-user-add-modal/trip-user-add-modal.component';
import {TripDetailsComponent} from './trip-details/trip-details.component';
import {TripUserViewComponent} from './trip-user-view/trip-user-view.component';

@NgModule({
  declarations: [
    TripListComponent,
    TripAddComponent,
    TripDetailsComponent,
    TripUserViewComponent,
    TripUserAddModalComponent
  ],
  imports: [
    NgbModule,
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
    OwlDateTimeModule,
    OwlNativeDateTimeModule
  ],
  entryComponents: [TripUserAddModalComponent]
})
export class TripsModule { }
