import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {EventCalendarView, EventCreateForm, EventView} from "../model/event";
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

  public listOfUser(id: string): Observable<EventCalendarView[]> {
    return this.http.get<EventCalendarView[]>(environment.urls.events.ofUser(id));
  }

  public delete(id: string): Observable<EntityId> {
    return this.http.delete<EntityId>(environment.urls.events.delete(id));
  }

  public get(id: string): Observable<EventView> {
    return this.http.get<EventView>(environment.urls.events.get(id));
  }

  public confirm(id: string): Observable<EntityId> {
    return this.http.put<EntityId>(environment.urls.events.confirm(id), {});
  }

  public decline(id: string): Observable<EntityId> {
    return this.http.put<EntityId>(environment.urls.events.decline(id), {});
  }
}
