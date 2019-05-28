import { Injectable } from '@angular/core';
import {Apartment} from './models/apartment';
import {environment} from '../../environments/environment';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ApartmentsService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<any>(environment.urls.apartments.all);
  }

  getById(id) {
    return this.http.get<any>(environment.urls.apartments.get(id));
  }

  getPaged(params) {
    return this.http.get<any>(environment.urls.apartments.list, { params: params });
  }

  createApartment(apartment) {
    return this.http.post<Apartment>(environment.urls.apartments.create, apartment);
  }

  updateApartment(id, apartment) {
    return this.http.put<Apartment>(environment.urls.apartments.update(id), apartment);
  }

  deleteApartment(id: string) {
    return this.http.delete(environment.urls.apartments.delete(id));
  }
}
