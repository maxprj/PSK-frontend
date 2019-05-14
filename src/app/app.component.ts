import {Component} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {AuthenticationService} from './_services';
import {slideInAnimation} from './animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [slideInAnimation]
})
export class AppComponent {
  currentToken: any;
  constructor(
    private authenticationService: AuthenticationService,
    public router: Router
  ) {
    this.authenticationService.currentToken.subscribe(x => this.currentToken = x);
  }
  logout() {
    this.authenticationService.logout();
  }
  getAnimationData(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}
