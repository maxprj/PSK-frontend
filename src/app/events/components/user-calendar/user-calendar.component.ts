import {Component, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CalendarEvent, CalendarEventAction} from 'angular-calendar';
import {EventService} from "../../service/event.service";
import {EventCalendarView} from "../../model/event";
import {map, tap} from "rxjs/internal/operators";
import {environment} from "../../../../environments/environment";
import {EventOwnerDetailsComponent} from "../details/event-owner-details/event-owner-details.component";
import {EventDetailsComponent} from "../details/event-details/event-details.component";
import {TripEventDetailsComponent} from "../../../shared/components/trip-event-details/trip-event-details.component";
import {EventAddModalComponent} from "../details/event-add-modal/event-add-modal.component";


@Component({
  selector: 'app-user-calendar',
  templateUrl: './user-calendar.component.html',
  styleUrls: ['./user-calendar.component.scss']
})
export class UserCalendarComponent implements OnInit {

  loading = true;
  userEvents = [];

  constructor(private modal: NgbModal,
              private eventService: EventService) {
  }


  userEventActions: CalendarEventAction[] = [
    {
      label: '<a><i class="material-icons">delete</i></a>',
      onClick: ({event}: { event: CalendarEvent }): void => {
        this.deleteEvent(event);
      }
    }
  ];

  refresh: Subject<any> = new Subject();

  events: CalendarEvent[] = [];

  ngOnInit() {
    this.loadEvents();
  }

  handleEvent(event: CalendarEvent): void {
    if (event.meta.trip) {
      this.showTripDetails(event);
    } else if (event.meta.owner) {
      this.showOwnerDetails(event);
    } else {
      this.showEventDetails(event);
    }
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

  showOwnerDetails(event: CalendarEvent) {
    const modalRef = this.modal.open(EventOwnerDetailsComponent,
      {
        size: 'lg',
        windowClass: 'show'
      });

    modalRef.componentInstance.id = event.id;
  }

  showEventDetails(event: CalendarEvent) {
    console.log(event);
    const modalRef = this.modal.open(EventDetailsComponent,
      {
        size: 'lg',
        windowClass: 'show'
      });
    modalRef.componentInstance.event = this.userEvents.find(e => e.id === event.id);
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
    this.eventService.list().pipe(tap(events => this.userEvents = events),
      map(events => events.map(e => this.toCalendarEvent(e)))
    ).subscribe((events) => {
      this.events = events;
      this.refresh.next();
      this.loading = false;
    });
  }

  toCalendarEvent(e: EventCalendarView): CalendarEvent {
    return <CalendarEvent>{
      id: e.id,
      start: new Date(e.start),
      end: new Date(e.end),
      title: e.name,
      draggable: false,
      allDay: false,
      color: e.trip ? environment.constants.calendar.color.tripEvent : environment.constants.calendar.color.userEvent,
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
}
