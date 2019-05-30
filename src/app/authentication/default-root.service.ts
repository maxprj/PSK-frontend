import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { UserRole } from '../users/_models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DefaultRootService {

  constructor(private authenticationService: AuthenticationService) { }

  get getHomePageBaseOnUserRole() {
    const userRole = this.authenticationService.currentUserRole;

    if (userRole == UserRole.ROLE_USER) {
      return environment.homePageUrls.user;
    } else if (userRole == UserRole.ROLE_ORGANIZER) {
      return environment.homePageUrls.organiser;
    } else {
      return environment.homePageUrls.admin;
    }
  }
}
