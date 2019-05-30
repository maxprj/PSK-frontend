import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {TOKEN_PSK} from '../utils/constants';
import { AuthenticationService } from './authentication.service';
import { DefaultRootService } from './default-root.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private defaultRootService: DefaultRootService
  ) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (localStorage.getItem(TOKEN_PSK) != null) {
      const userRole = this.authenticationService.currentUserRole;

      if (next.data.roles && next.data.roles.indexOf(userRole) === -1) {
        this.router.navigate([this.defaultRootService.getHomePageBaseOnUserRole]);
        return false;
      }

      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
