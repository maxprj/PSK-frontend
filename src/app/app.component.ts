import {Component} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {slideInAnimation} from './animations';
import {AuthenticationService} from './authentication/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [slideInAnimation]
})
export class AppComponent {
  constructor(
  ) {
  }
}
