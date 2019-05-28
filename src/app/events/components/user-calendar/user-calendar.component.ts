import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {isSameDay, isSameMonth} from 'date-fns';
import {Subject} from 'rxjs';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CalendarEvent, CalendarEventAction, CalendarView} from 'angular-calendar';
import {EventAddModalComponent} from "../event-add-modal/event-add-modal.component";
import {EventService} from "../../service/event.service";
import {EventCalendarView} from "../../model/event";
import {map} from "rxjs/internal/operators";
import {TripEventDetailsComponent} from "../trip-event-details/trip-event-details.component";


const colors: any = {

  userEvent: {
    primary: '#4285f4',
    secondary: '#4285f4'
  },
  tripEvent: {
    primary: '#00c851',
    secondary: '#00c851'
  }
};


@Component({
  selector: 'app-user-calendar',
  templateUrl: './user-calendar.component.html',
  styleUrls: ['./user-calendar.component.scss']
})
export class UserCalendarComponent implements OnInit {

  ngOnInit() {
    this.loadEvents();
  }

  loading: boolean = true;

  constructor(private modal: NgbModal,
              private eventService: EventService) {
  }

  @ViewChild('modalContent') modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  userEventActions: CalendarEventAction[] = [
    // {
    //   label: '<a><i class="material-icons">edit</i></a>',
    //   onClick: ({event}: { event: CalendarEvent }): void => {
    //     this.handleEvent('Edited', event);
    //   }
    // },
    {
      label: '<a><i class="material-icons">delete</i></a>',
      onClick: ({event}: { event: CalendarEvent }): void => {
        this.deleteEvent(event);
      }
    }
  ];

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  refresh: Subject<any> = new Subject();

  events: CalendarEvent[] = [];

  activeDayIsOpen: boolean = false;

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

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = {event, action};
    switch (action) {
      case 'Clicked': {
        event.meta.trip ? this.showTripDetails(event) : null;
      }
    }
    // this.modal.open(this.modalContent, {size: 'lg'});
  }

  showTripDetails(event: CalendarEvent) {
    const modalRef = this.modal.open(TripEventDetailsComponent,
      {
        size: 'lg',
        windowClass: 'show'
      });

    modalRef.componentInstance.id = event.id;
    modalRef.result.then(accepted => {
      if (!accepted) {
        this.loading = true;
        this.loadEvents();
      }
    });
  }

  addEvent() {
    const modalRef = this.modal.open(EventAddModalComponent,
      {
        size: 'lg',
        windowClass: 'show'
      });
    modalRef.result.then((result) => {
      this.loading = true;
      this.eventService.create(result).pipe().subscribe(e => {
        this.loadEvents();
      });
    }).catch((error) => {

    });
  }

  loadEvents() {
    this.eventService.list().pipe(
      map(events => events.map(e => this.toCalendarEvent(e)))
    ).subscribe((events) => {
      this.events = events;
      this.refresh.next();
      this.loading = false;
    })
  }

  toCalendarEvent(e: EventCalendarView): CalendarEvent {
    return <CalendarEvent>{
      id: e.id,
      start: new Date(e.start),
      end: new Date(e.end),
      title: e.description,
      draggable: false,
      allDay: false,
      color: e.trip ? colors.tripEvent : colors.userEvent,
      actions: e.owner ? this.userEventActions : [],
      meta: {
        trip: e.trip,
        owner: e.owner
      }
    };
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.loading = true;
    this.eventService.delete(<string>eventToDelete.id).subscribe(id => {
      this.events = this.events.filter(event => event !== eventToDelete);
      this.refresh.next();
      this.loading = false;
    });
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
}
