import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserCalendarComponent} from './components/user-calendar/user-calendar.component';

@NgModule({
  declarations: [UserCalendarComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgbModalModule,
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    })
  ]
})
export class EventsModule {
}
