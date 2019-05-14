import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';
import {TOKEN_NAME} from '../utils/constants';
import {map} from 'rxjs/operators';
import {AlertService} from './alert.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentTokenSubject: BehaviorSubject<any>;
  public currentToken: Observable<any>;

  constructor(private http: HttpClient,
              private router: Router,
              private alertService: AlertService) {
    this.currentTokenSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem(TOKEN_NAME)));
    this.currentToken = this.currentTokenSubject.asObservable();
  }

  public get currentUserValue(): any {
    return this.currentTokenSubject.value;
  }

  login(username: string, password: string) {
    const body = 'username=' + username + '&password=' + password + '&grant_type=password';
    const httpHeaders = new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + btoa('mif-psk:mif-psk-secret') // TODO iskelt
      });
    return this.http.post(`${environment.loginUrl}`, body, {headers: httpHeaders}).pipe(map(data => {
      localStorage.setItem(TOKEN_NAME, JSON.stringify(data));
      this.currentTokenSubject.next(data);
    }));
  }

  logout() {
    localStorage.removeItem(TOKEN_NAME);
    this.currentTokenSubject.next(null);
    this.router.navigate(['/login']);
  }
}
