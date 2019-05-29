import 'flatpickr/dist/flatpickr.css';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserCalendarComponent} from './components/user-calendar/user-calendar.component';
import {NgbModalModule} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {EventsRoutingModule} from "./events-routing.module";
import {MatIconModule, MatProgressSpinnerModule} from "@angular/material";
import {AuthenticationModule} from "../authentication/authentication.module";
import {SharedModule} from "../shared/shared.module";
import {OwlDateTimeModule, OwlNativeDateTimeModule} from "ng-pick-datetime";
import {TableModule} from "angular-bootstrap-md";
import {UserAvailabilityComponent} from './components/user-availability/user-availability.component';
import {EventAddModalComponent} from "./components/details/event-add-modal/event-add-modal.component";
import {EventDetailsComponent} from "./components/details/event-details/event-details.component";
import {EventOwnerDetailsComponent} from "./components/details/event-owner-details/event-owner-details.component";

@NgModule({
  declarations: [UserCalendarComponent, EventAddModalComponent, EventDetailsComponent, EventOwnerDetailsComponent, UserAvailabilityComponent],
  imports: [
    EventsRoutingModule,
    CommonModule,
    FormsModule,
    NgbModalModule,
    AuthenticationModule,
    MatProgressSpinnerModule,
    MatIconModule,
    SharedModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    ReactiveFormsModule,
    TableModule,
    MatIconModule,

  ],
  entryComponents: [
    EventAddModalComponent,
    EventDetailsComponent,
    EventOwnerDetailsComponent
  ]
})
export class EventsModule {
}
