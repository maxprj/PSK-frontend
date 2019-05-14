import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthenticationGuard} from './authentication.guard';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthenticationInterceptor} from './authentication.interceptor';
import {LoginComponent} from './login';
import {AuthenticationService} from './authentication.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [ AuthenticationService, AuthenticationGuard,
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthenticationInterceptor,
    multi: true
  }]
})
export class AuthenticationModule { }
