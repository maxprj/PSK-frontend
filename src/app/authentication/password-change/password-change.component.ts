import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

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

  constructor(private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private service: AuthenticationService,
              private router: Router) { }

  ngOnInit() {
    this.token = this.route.snapshot.queryParamMap.get('token');
    this.formSettings = this.formBuilder.group({
      password: ['', Validators.required],
      token: [this.token]
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
    
    this.service.changePassword(this.formSettings.value).pipe().subscribe(data => {
        this.router.navigate(['/login']);
      },
      error => {
        this.alertService.error(error.error.error_description);
      }
    );
  }
}
