import {Component, ElementRef, ViewChild} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import {Router} from "@angular/router";
import { UserRole } from 'src/app/users/_models/enums/UserRoleEnum';
import { MatSidenav } from '@angular/material';
import { USER_VIEW } from 'src/app/utils/constants';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {
  isAdmin: boolean;
  isOrganiser: boolean;
  isUser: boolean;
  userFirstName: String;
  userLastName: String;

  @ViewChild('drawer') drawer: MatSidenav;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver,
              private router: Router,
              private authenticationService: AuthenticationService) {
    this.setMenuVisibilityValues();
    this.setUserFirstAndLastName();
  }

  logout() {
    this.authenticationService.logout();
  }

  navigate(route: string) {
    this.router.navigate([route]);
    this.drawer.close();
  }
  
  setMenuVisibilityValues() {
    const userRole = this.authenticationService.currentUserRole;
    this.isAdmin = userRole == UserRole.ROLE_ADMIN;
    this.isOrganiser = userRole == UserRole.ROLE_ORGANIZER;
    this.isUser = userRole == UserRole.ROLE_USER;
  }

  setUserFirstAndLastName() {
    if (localStorage.getItem(USER_VIEW) != null) {
      const currentUserToken = new BehaviorSubject<any>(JSON.parse(localStorage.getItem(USER_VIEW)));
      this.userFirstName = currentUserToken.value['name'];
      this.userLastName = currentUserToken.value['surname'];
    }
  }

}
