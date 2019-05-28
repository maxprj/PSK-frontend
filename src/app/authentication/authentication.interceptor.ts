import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {Router} from '@angular/router';
import {catchError, map} from 'rxjs/operators';
import {TOKEN_PSK} from '../utils/constants';
import {AlertService} from '../shared/components/alert/alert.service';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {

  constructor(private router: Router,
              private alertService: AlertService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (req.headers.get('Authorization') != null) {
      return next.handle(req.clone());
    } else {
      if (localStorage.getItem(TOKEN_PSK) != null) {
        const token = JSON.parse(localStorage.getItem(TOKEN_PSK));
        const clonedreq = req.clone({
          headers: req.headers.set('Authorization', 'Bearer ' + token.access_token)
        });
        return next.handle(clonedreq).pipe(
          map((event: HttpEvent<any>) => {
            return event;
          }),
          catchError((error: HttpErrorResponse) => {
            if (error.status === 401) {
              localStorage.removeItem(TOKEN_PSK);
              this.router.navigate(['/login']);
            } else {
              this.alertService.error(error.message);
            }
            return throwError(error);
          }));
      } else {
        return next.handle(req.clone());
      }
    }
  }
}
