import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {routing} from './app-routing';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material';
import {NgbModalModule} from '@ng-bootstrap/ng-bootstrap';
import { AlertComponent } from './alert/alert.component';
import { HomeComponent } from './home/home.component';
import {AuthenticationService} from './_services';
import {AuthGuard} from './_guards/auth.guard';
import {AuthInterceptor} from './_interceptors/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AlertComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatIconModule,
    NgbModalModule,
    FormsModule,
    ReactiveFormsModule,
    routing
  ],
  providers: [AuthenticationService, AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
