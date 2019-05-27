import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

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

  getTripById(id) {
    return this.http.get<any>(environment.urls.trip.byId(id));
  }

  updateTrip(id, trip) {
    return this.http.put<any>(environment.urls.trip.byId(id), trip);
  }

  deleteTrip(id) {
    return this.http.delete(environment.urls.trip.byId(id));
  }

  confirmTrip(tripId, userId) {
    return this.http.put(environment.urls.trip.confirm(tripId, userId), null);
  }

  declineTrip(tripId, userId) {
    return this.http.put(environment.urls.trip.decline(tripId, userId), null);
  }

  getMergableTrips(id) {
    return this.http.get(environment.urls.trip.match(id));
  }

  mergeTrips(params) {
    return this.http.post(environment.urls.trip.merge, null, {params: params});
  }

  getTripsByUserId(userId) {
    return this.http.get(environment.urls.trip.userTrips(userId));
  }
}
