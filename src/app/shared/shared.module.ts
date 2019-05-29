import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormRowWrapperComponent} from './components/form-row-wrapper/form-row-wrapper.component';
import {BtnSecondaryComponent} from './components/btn-secondary/btn-secondary.component';
import {BtnPrimaryComponent} from './components/btn-primary/btn-primary.component';
import {InvalidFeedbackComponent} from './components/invalid-feedback/invalid-feedback.component';
import {PaginatorComponent} from './components/paginator/paginator.component';
import {OtherExpenseComponent} from './components/other-expense/other-expense.component';
import {ModalBtnCloseComponent} from './components/modal-btn-close/modal-btn-close.component';
import {LoaderComponent} from './components/loader/loader.component';
import {AlertComponent} from './components/alert/alert.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TripStatusPipe} from './pipes/trip-status-pipe';
import {BtnCancelComponent} from './components/btn-cancel/btn-cancel.component';
import {TripStatusColorPipe} from './pipes/TripStatusColorPipe';
import {UserStatusPipe} from "./pipes/user-status-pipe";
import {CalendarWrapperComponent} from './components/calendar-wrapper/calendar-wrapper.component';
import {adapterFactory} from "angular-calendar/date-adapters/date-fns";
import {CalendarModule, DateAdapter} from "angular-calendar";
import {MatProgressSpinnerModule} from "@angular/material";
import {EventUserStatusPipe} from "./pipes/event-user-status.pipe";
import {TripEventDetailsComponent} from "./components/trip-event-details/trip-event-details.component";
import {OwlDateTimeModule, OwlNativeDateTimeModule} from "ng-pick-datetime";

@NgModule({
  declarations: [
    FormRowWrapperComponent,
    BtnSecondaryComponent,
    BtnPrimaryComponent,
    InvalidFeedbackComponent,
    PaginatorComponent,
    OtherExpenseComponent,
    ModalBtnCloseComponent,
    LoaderComponent,
    AlertComponent,
    TripStatusPipe,
    UserStatusPipe,
    EventUserStatusPipe,
    BtnCancelComponent,
    CalendarWrapperComponent,
    TripEventDetailsComponent,
    TripStatusColorPipe,
    BtnCancelComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    })
  ],
  exports: [
    FormRowWrapperComponent,
    BtnSecondaryComponent,
    BtnPrimaryComponent,
    BtnCancelComponent,
    InvalidFeedbackComponent,
    PaginatorComponent,
    OtherExpenseComponent,
    ModalBtnCloseComponent,
    LoaderComponent,
    AlertComponent,
    TripStatusPipe,
    TripStatusColorPipe,
    UserStatusPipe,
    EventUserStatusPipe,
    TripEventDetailsComponent,
    CalendarWrapperComponent
  ],
  entryComponents: [
    TripEventDetailsComponent
  ]
})
export class SharedModule { }
