import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { PasswordForm } from '../_models/auth.models';

@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.scss']
})
export class PasswordChangeComponent implements OnInit {
  formSettings: FormGroup;
  submitted = false;
  token;
  alertService: any;
  passwordForm: PasswordForm;

  constructor(private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private service: AuthenticationService,
              private router: Router) { }

  ngOnInit() {
    this.token = this.route.snapshot.queryParamMap.get('token');
    this.formSettings = this.formBuilder.group({
      password: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9]{7,}$")]]
    });
  }

  get f() {
    return this.formSettings.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.formSettings.invalid) {
      return;
    }

    this.passwordForm = {
      password: this.f.password.value,
      token: this.token
    }

    this.service.changePassword(this.passwordForm).pipe().subscribe(data => {
        this.router.navigate(['/login']);
      },
      error => {
        this.alertService.error(error.error.error_description);
      }
    );
  }
}
