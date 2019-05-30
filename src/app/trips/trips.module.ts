import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TripListComponent} from './trip-list/trip-list.component';
import {MatIconModule, MatProgressSpinnerModule} from '@angular/material';
import {SharedModule} from '../shared/shared.module';
import {TripAddComponent} from './trip-add/trip-add.component';
import {ButtonsModule, CheckboxModule, TableModule, WavesModule} from 'angular-bootstrap-md';
import {NgbModalModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AuthenticationModule} from '../authentication/authentication.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TripsRoutingModule} from './trips-routing.module';
import {TripUserAddModalComponent} from './trip-user-add-modal/trip-user-add-modal.component';
import {OwlDateTimeModule, OwlNativeDateTimeModule} from 'ng-pick-datetime';
import {TripsMergeModalComponent} from './trips-merge-modal/trips-merge-modal.component';
import {TripDetailsComponent} from './trip-details/trip-details.component';
import {TripUserViewComponent} from './trip-user-view/trip-user-view.component';

@NgModule({
  declarations: [
    TripsMergeModalComponent,
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
    ButtonsModule,
    WavesModule,
    FormsModule,
    CheckboxModule,
    SharedModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule
  ],
  entryComponents: [
    TripUserAddModalComponent,
    TripsMergeModalComponent
  ]
})
export class TripsModule {
}
