import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { TOKEN_PSK } from '../utils/constants';
import { DefaultRootService } from './default-root.service';

@Injectable({
  providedIn: 'root'
})
export class UnauthGuard implements CanActivate {
  constructor(
    private router: Router,
    private defaultRootService: DefaultRootService
  ) {}
  
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (localStorage.getItem(TOKEN_PSK) != null)
    {
      this.router.navigate([this.defaultRootService.getHomePageBaseOnUserRole]);
      return false;
    }
    return true;
  }
  
}
