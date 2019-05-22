import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ApartmentsListComponent} from './apartments-list/apartments-list.component';
import {ApartmentsDetailsComponent} from './apartments-details/apartments-details.component';
import {ApartmentAddModalComponent} from './apartment-add-modal/apartment-add-modal.component';
import {NgbModalModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AuthenticationModule} from '../authentication/authentication.module';
import {MatIconModule, MatProgressSpinnerModule} from '@angular/material';
import {routing} from '../app-routing';
import {ReactiveFormsModule} from '@angular/forms';
import {TableModule} from 'angular-bootstrap-md';

@NgModule({
  declarations: [
    ApartmentsListComponent,
    ApartmentsDetailsComponent,
    ApartmentAddModalComponent
  ],
  imports: [
    NgbModule,
    routing,
    NgbModalModule,
    AuthenticationModule,
    MatProgressSpinnerModule,
    MatIconModule,
    ReactiveFormsModule,
    CommonModule,
    TableModule
  ],
  entryComponents: [ApartmentAddModalComponent]
})
export class ApartmentsModule { }
