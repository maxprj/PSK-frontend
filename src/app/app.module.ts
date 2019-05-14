import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {routing} from './app-routing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material';
import {NgbModalModule} from '@ng-bootstrap/ng-bootstrap';
import {AlertComponent} from './alert/alert.component';
import {HomeComponent} from './home/home.component';
import {AuthenticationModule} from './authentication/authentication.module';

@NgModule({
  declarations: [
    AppComponent,
    AlertComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatIconModule,
    NgbModalModule,
    AuthenticationModule,
    routing
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
