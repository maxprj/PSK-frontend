import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { NewUserForm } from './_models/NewUserForm';
import { UpdateUserForm } from './_models/UpdateUserForm';
import { UserListView } from './_models/UserListView';
import { UserView } from './_models/UserView';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<any>(environment.urls.users.allList);
  }

  getPaged(params) {
    return this.http.get<UserListView[]>(environment.urls.users.list, { params: params });
  }

  getById(id) {
    return this.http.get<UserView>(environment.urls.users.get(id));
  }

  createUser(user) {
    return this.http.post<NewUserForm>(environment.urls.users.create, user);
  }

  updateUser(id, user) {
    return this.http.put<UpdateUserForm>(environment.urls.users.update(id), user);
  }
}
