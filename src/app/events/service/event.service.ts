import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {EventCalendarView, EventCreateForm} from "../model/event";
import {environment} from "../../../environments/environment";
import {EntityId} from "../../shared/model/shared.model";
import {Observable} from "rxjs/index";

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http: HttpClient) {
  }

  public create(form: EventCreateForm): Observable<EntityId> {
    return this.http.post<EntityId>(environment.urls.events.create, form);
  }

  public list(): Observable<EventCalendarView[]> {
    return this.http.get<EventCalendarView[]>(environment.urls.events.list);
  }

  public delete(id: string): Observable<EntityId> {
    return this.http.delete<EntityId>(environment.urls.events.delete(id));
  }
}
