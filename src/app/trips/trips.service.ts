import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TripsService {

  constructor(private http: HttpClient) { }

  getAllTrips(params) {
    return this.http.get<any>(environment.urls.trip, {params: params});
  }

  createTrip(trip) {
    return this.http.post(environment.urls.trip, trip);
  }

  getTripById(id) {
    return this.http.get<any>(environment.urls.trip + `/${id}`);
  }

  updateTrip(id, trip) {
    return this.http.put<any>(environment.urls.trip + `/${id}`, trip);
  }

  deleteTrip(id) {
    return this.http.delete(environment.urls.trip + `/${id}`);
  }

  confirmTrip(tripId, userId) {
    return this.http.put(environment.urls.trip + `/${tripId}/${userId}/confirm/`, null);
  }

  declineTrip(tripId, userId) {
    return this.http.put(environment.urls.trip + `/${tripId}/${userId}/decline/`, null);
  }

  getMergableTrips(id) {
    return this.http.get(environment.urls.trip + `/${id}/match`);
  }

  mergeTrips(params) {
    return this.http.post(environment.urls.trip + `/merge`, null, {params: params});
  }

  getTripsByUserId(userId) {
    return this.http.get(environment.urls.trip + `/user/${userId}`);
  }
}
