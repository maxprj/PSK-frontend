import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {routing} from './app-routing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AlertComponent} from './alert/alert.component';
import {HomeComponent} from './home/home.component';
import {AuthenticationModule} from './authentication/authentication.module';
import {ApartmentsModule} from './apartments/apartments.module';
import {MDBBootstrapModule} from 'angular-bootstrap-md';
import { UsersModule } from './users/users.module';

@NgModule({
  declarations: [
    AppComponent,
    AlertComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AuthenticationModule,
    routing,
    ApartmentsModule,
    UsersModule,
    MDBBootstrapModule.forRoot()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
