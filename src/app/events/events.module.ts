import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserCalendarComponent} from './components/user-calendar/user-calendar.component';
import {adapterFactory} from "angular-calendar/date-adapters/date-fns";
import {CalendarModule, DateAdapter} from "angular-calendar";
import {NgbModalModule} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [UserCalendarComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgbModalModule,
    // FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    })
  ]
})
export class EventsModule {
}
