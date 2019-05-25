import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthenticationGuard} from './authentication.guard';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthenticationInterceptor} from './authentication.interceptor';
import {LoginComponent} from './login';
import {AuthenticationService} from './authentication.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../shared/shared.module';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { PasswordChangeComponent } from './password-change/password-change.component';
import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [LoginComponent, PasswordResetComponent, PasswordChangeComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NgbModalModule,
    NgbModule
  ],
  providers: [ AuthenticationService, AuthenticationGuard,
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthenticationInterceptor,
    multi: true
  }],
  entryComponents: [PasswordResetComponent]
})
export class AuthenticationModule { }
