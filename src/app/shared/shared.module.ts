import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormRowWrapperComponent} from './components/form-row-wrapper/form-row-wrapper.component';
import {BtnSecondaryComponent} from './components/btn-secondary/btn-secondary.component';
import {BtnPrimaryComponent} from './components/btn-primary/btn-primary.component';
import {InvalidFeedbackComponent} from './components/invalid-feedback/invalid-feedback.component';
import {PaginatorComponent} from './components/paginator/paginator.component';
import {OtherExpenseComponent} from './components/other-expense/other-expense.component';
import {ModalBtnCloseComponent} from './components/modal-btn-close/modal-btn-close.component';
import {LoaderComponent} from './components/loader/loader.component';
import {AlertComponent} from './components/alert/alert.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TripStatusPipe} from "./pipes/trip-status-pipe";
import {BtnCancelComponent} from './components/btn-cancel/btn-cancel.component';

@NgModule({
  declarations: [
    FormRowWrapperComponent,
    BtnSecondaryComponent,
    BtnPrimaryComponent,
    InvalidFeedbackComponent,
    PaginatorComponent,
    OtherExpenseComponent,
    ModalBtnCloseComponent,
    LoaderComponent,
    AlertComponent,
    TripStatusPipe,
    BtnCancelComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    FormRowWrapperComponent,
    BtnSecondaryComponent,
    BtnPrimaryComponent,
    BtnCancelComponent,
    InvalidFeedbackComponent,
    PaginatorComponent,
    OtherExpenseComponent,
    ModalBtnCloseComponent,
    LoaderComponent,
    AlertComponent,
    TripStatusPipe
  ]
})
export class SharedModule { }
