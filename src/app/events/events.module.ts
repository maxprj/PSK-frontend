import 'flatpickr/dist/flatpickr.css';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserCalendarComponent} from './components/user-calendar/user-calendar.component';
import {adapterFactory} from "angular-calendar/date-adapters/date-fns";
import {CalendarModule, DateAdapter} from "angular-calendar";
import {NgbModalModule} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {EventsRoutingModule} from "./events-routing.module";
import {EventAddModalComponent} from './components/event-add-modal/event-add-modal.component';
import {MatIconModule, MatProgressSpinnerModule} from "@angular/material";
import {AuthenticationModule} from "../authentication/authentication.module";
import {SharedModule} from "../shared/shared.module";
import {OwlDateTimeModule, OwlNativeDateTimeModule} from "ng-pick-datetime";
import {TripEventDetailsComponent} from './components/trip-event-details/trip-event-details.component';
import {EventDetailsComponent} from './components/event-details/event-details.component';
import {TableModule} from "angular-bootstrap-md";
import {EventOwnerDetailsComponent} from './components/event-owner-details/event-owner-details.component';

@NgModule({
  declarations: [UserCalendarComponent, EventAddModalComponent, TripEventDetailsComponent, EventDetailsComponent, EventOwnerDetailsComponent],
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
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    })
  ],
  entryComponents: [
    EventAddModalComponent,
    TripEventDetailsComponent,
    EventDetailsComponent
  ]
})
export class EventsModule {
}
