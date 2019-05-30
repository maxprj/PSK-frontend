import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {routing} from './app-routing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AuthenticationModule} from './authentication/authentication.module';
import {MDBBootstrapModule} from 'angular-bootstrap-md';
import { CoreModule } from './core/core.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AuthenticationModule,
    routing,
    MDBBootstrapModule.forRoot(),
    CoreModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
