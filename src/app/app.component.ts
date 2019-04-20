import { Component } from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {AuthenticationService} from './_services';
import { slideInAnimation } from './animations';
import {User} from './_models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [slideInAnimation]
})
export class AppComponent {
  currentUser: User;
  title = 'frontend';
  constructor(
    private authenticationService: AuthenticationService,
    public router: Router
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }
  logout() {
    this.authenticationService.logout();

  }
  getAnimationData(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}
