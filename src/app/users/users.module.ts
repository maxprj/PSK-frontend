import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserCreateComponent } from './user-create/user-create.component';
import { UserUpdateComponent } from './user-update/user-update.component';
import { UserListComponent } from './user-list/user-list.component';
import { UsersRoutingModule } from './users-routing.module';
import { TableModule, WavesModule } from 'angular-bootstrap-md';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationModule } from '../authentication/authentication.module';
import { MatProgressSpinnerModule, MatIconModule } from '@angular/material';
import { UserRolePipe } from '../users/_models/enums/UserRolePipe';

@NgModule({
  declarations: [UserCreateComponent, UserUpdateComponent, UserListComponent, UserRolePipe],
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
