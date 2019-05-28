import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {TOKEN_PSK} from '../utils/constants';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (localStorage.getItem(TOKEN_PSK) != null) {
      const helper = new JwtHelperService();
      const decodedToken = helper.decodeToken(this.authenticationService.currentUserValue['access_token']);
      const userRole = decodedToken['authorities'][0];

      if (next.data.roles && next.data.roles.indexOf(userRole) === -1) {
        this.router.navigate(['/error']);
        return false;
      }

      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
