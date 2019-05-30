import {NgModule} from '@angular/core';
import {ApartmentsListComponent} from './apartments-list/apartments-list.component';
import {ApartmentsDetailsComponent} from './apartments-details/apartments-details.component';
import {ApartmentAddModalComponent} from './apartment-add-modal/apartment-add-modal.component';
import {NgbModalModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AuthenticationModule} from '../authentication/authentication.module';
import {MatIconModule, MatProgressSpinnerModule} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TableModule, WavesModule} from 'angular-bootstrap-md';
import {ApartmentsRoutingModule} from './apartments-routing.module';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import {HttpClientModule} from "@angular/common/http";
import { ReservationListComponent } from './reservation-list/reservation-list.component';

@NgModule({
  declarations: [
    ApartmentsListComponent,
    ApartmentsDetailsComponent,
    ApartmentAddModalComponent,
    ReservationListComponent
  ],
  imports: [
    NgbModule,
    HttpClientModule,
    NgbModalModule,
    AuthenticationModule,
    MatProgressSpinnerModule,
    MatIconModule,
    ReactiveFormsModule,
    CommonModule,
    ApartmentsRoutingModule,
    TableModule,
    WavesModule,
    FormsModule,
    SharedModule
  ],
  entryComponents: [ApartmentAddModalComponent]
})
export class ApartmentsModule { }
