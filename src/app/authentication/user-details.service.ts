import { Injectable } from '@angular/core';
import {USER_VIEW} from "../utils/constants";

@Injectable({
  providedIn: 'root'
})
export class UserDetailsService {

  constructor() { }

  public getDetails() {
    return localStorage.getItem(JSON.parse(USER_VIEW));
  }
}
