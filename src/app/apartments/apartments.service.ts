import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Apartment} from './models/apartment';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApartmentsService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<any>(environment.urls.apartments);
  }

  createApartment(apartment) {
    return this.http.post<Apartment>(environment.urls.apartments, apartment);
  }

  updateApartment(id, apartment) {
    return this.http.put<Apartment>(environment.urls.apartments + `/${id}`, apartment);
  }

  deleteApartment(id) {
    return this.http.delete(environment.urls.apartments + `/${id}`);
  }
}
