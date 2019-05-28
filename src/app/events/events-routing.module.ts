import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UserCalendarComponent} from "./components/user-calendar/user-calendar.component";
import {AuthenticationGuard} from "../authentication/authentication.guard";

const routes: Routes = [
  {
    path: '',
    component: UserCalendarComponent,
    canActivate: [AuthenticationGuard]
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class EventsRoutingModule {
}
