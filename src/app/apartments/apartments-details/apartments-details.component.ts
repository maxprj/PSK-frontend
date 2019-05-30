import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ApartmentsService} from '../apartments.service';
import {Location} from '@angular/common';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-apartments-details',
  templateUrl: './apartments-details.component.html',
  styleUrls: ['./apartments-details.component.scss']
})
export class ApartmentsDetailsComponent implements OnInit {
  formSettings: FormGroup;
  apartmentId;
  submitted = false;

  constructor(private location: Location,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private service: ApartmentsService) { }

  ngOnInit() {
    this.apartmentId = this.route.snapshot.paramMap.get('apartmentId');
    this.formSettings = this.formBuilder.group({
      name: ['', Validators.required],
      address: this.formBuilder.group({
        apartmentNumber: ['', Validators.required],
        street: ['', Validators.required],
        city: ['', Validators.required]
      }),
      size: ['', [Validators.required, Validators.min(1)]],
      updatedAt: ['']
    });
     this.service.getById(this.apartmentId).pipe().subscribe(result => {
       this.formSettings.patchValue(result);
     });
  }

  save() {
    this.submitted = true;
    if (this.formSettings.invalid) {
      return;
    }
    this.service.updateApartment(this.apartmentId, this.formSettings.value).pipe().subscribe(() => {
      this.location.back();
    });
  }

  get f() {
    return this.formSettings.controls;
  }
}
