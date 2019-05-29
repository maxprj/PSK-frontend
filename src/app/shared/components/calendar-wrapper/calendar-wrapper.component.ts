import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CalendarEvent, CalendarView} from "angular-calendar";
import {isSameDay, isSameMonth} from "date-fns";

@Component({
  selector: 'calendar-wrapper',
  templateUrl: './calendar-wrapper.component.html',
  styleUrls: ['./calendar-wrapper.component.scss']
})
export class CalendarWrapperComponent implements OnInit {

  constructor() {
    this.handleEvent = new EventEmitter<CalendarEvent>();
  }

  ngOnInit() {

  }

  view: CalendarView = CalendarView.Month;

  @Output('handleEvent') handleEvent: EventEmitter<CalendarEvent>;

  @Input() events: CalendarEvent[] = [];

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  activeDayIsOpen: boolean = false;

  @Input() loading: boolean = true;

  dayClicked({date, events}: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      this.viewDate = date;
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
    }
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  onEvent(event: CalendarEvent) {
    this.handleEvent.emit(event);
  }
}
