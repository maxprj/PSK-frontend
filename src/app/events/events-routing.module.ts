import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UserCalendarComponent} from "./components/user-calendar/user-calendar.component";

const routes: Routes = [
  {
    path: '',
    component: UserCalendarComponent,
    pathMatch: 'full'
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
