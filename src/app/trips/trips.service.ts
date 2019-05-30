import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from "rxjs/index";
import {TripDetailsView, TripUserView} from "./model/trip";

@Injectable({
  providedIn: 'root'
})
export class TripsService {

  constructor(private http: HttpClient) { }

  getAllTrips(params) {
    return this.http.get<any>(environment.urls.trip.list, {params: params});
  }

  createTrip(trip) {
    return this.http.post(environment.urls.trip.list, trip);
  }

  getTripById(id): Observable<TripDetailsView> {
    return this.http.get<TripDetailsView>(environment.urls.trip.byId(id));
  }

  updateTrip(id, trip) {
    return this.http.put<any>(environment.urls.trip.byId(id), trip);
  }

  deleteTrip(id) {
    return this.http.delete(environment.urls.trip.byId(id));
  }

  confirmTrip(tripId) {
    return this.http.put(environment.urls.trip.confirm(tripId), {});
  }

  declineTrip(tripId) {
    return this.http.put(environment.urls.trip.decline(tripId), {});
  }

  getMergableTrips(id) {
    return this.http.get<any>(environment.urls.trip.match(id));
  }

  mergeTrips(params) {
    return this.http.post(environment.urls.trip.merge, null, {params: params});
  }

  userView(id: string): Observable<TripUserView> {
    return this.http.get<TripUserView>(environment.urls.trip.userView(id));
  }

  listForUser(params) {
    return this.http.get<any>(environment.urls.trip.userList, {params: params});
  }
}
