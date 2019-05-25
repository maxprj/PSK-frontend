import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent implements OnInit {
  formSettings: FormGroup;
  submitted = false;
  userRoles = ['ROLE_USER', 'ROLE_ADMIN', 'ROLE_ORGANIZER'];
  
  constructor(public activeModal: NgbActiveModal,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.formSettings = this.formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', Validators.required],
      role: ['ROLE_USER', Validators.required]
    });
  }

  public submitForm() {
    this.submitted = true;
    if (this.formSettings.invalid) {
      return;
    }
    this.activeModal.close(this.formSettings.value);
  }

  get f() {
    return this.formSettings.controls;
  }
}
