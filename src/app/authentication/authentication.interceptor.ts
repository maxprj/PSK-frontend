import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {Router} from '@angular/router';
import {catchError, map} from 'rxjs/operators';
import {TOKEN_PSK} from '../utils/constants';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {


  constructor(private router: Router) {
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
            localStorage.removeItem(TOKEN_PSK);
            this.router.navigate(['/login']);
            return throwError(error);
          }));
      }
    }
  }
}
