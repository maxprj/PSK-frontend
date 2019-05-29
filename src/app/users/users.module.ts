import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserCreateComponent} from './components/user-create/user-create.component';
import {UserUpdateComponent} from './components/user-update/user-update.component';
import {UserListComponent} from './components/user-list/user-list.component';
import {UsersRoutingModule} from './users-routing.module';
import {TableModule, WavesModule} from 'angular-bootstrap-md';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../shared/shared.module';
import {NgbModalModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AuthenticationModule} from '../authentication/authentication.module';
import {MatIconModule, MatProgressSpinnerModule} from '@angular/material';
import {UserRolePipe} from '../users/_models/enums/UserRolePipe';
import {UserOrganizerViewComponent} from './components/user-organizer-view/user-organizer-view.component';

@NgModule({
  declarations: [UserCreateComponent, UserUpdateComponent, UserListComponent, UserRolePipe, UserOrganizerViewComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    TableModule,
    WavesModule,
    FormsModule,
    SharedModule,
    NgbModalModule,
    AuthenticationModule,
    MatProgressSpinnerModule,
    MatIconModule,
    ReactiveFormsModule,
    NgbModule
  ],
  entryComponents: [UserCreateComponent, UserUpdateComponent]
})
export class UsersModule { }
