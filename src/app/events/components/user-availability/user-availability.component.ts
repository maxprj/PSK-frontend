import {Component, OnInit} from '@angular/core';
import {CalendarEvent} from "angular-calendar";
import {ActivatedRoute} from "@angular/router";
import {EventService} from "../../service/event.service";
import {EventCalendarView} from "../../model/event";
import {environment} from "../../../../environments/environment";
import {map} from "rxjs/internal/operators";

@Component({
  selector: 'app-user-availability',
  templateUrl: './user-availability.component.html',
  styleUrls: ['./user-availability.component.scss']
})
export class UserAvailabilityComponent implements OnInit {

  loading: boolean = true;
  userId: string;

  events: CalendarEvent[] = [];

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService) { }

  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('userId');
    this.eventService.listOfUser(this.userId).pipe(
      map((events: EventCalendarView[]) => events.map(e => this.toCalendarEvent(e)))
    ).subscribe(events => {
      this.loading = false;
      this.events = events;
    })
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
      actions: [],
    };
  }

}
