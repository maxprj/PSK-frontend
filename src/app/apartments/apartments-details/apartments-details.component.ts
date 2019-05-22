import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Apartment} from '../models/apartment';
import {ActivatedRoute} from '@angular/router';
import {ApartmentsService} from '../apartments.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-apartments-details',
  templateUrl: './apartments-details.component.html',
  styleUrls: ['./apartments-details.component.scss']
})
export class ApartmentsDetailsComponent implements OnInit {

  apartment: Observable<Apartment>;
  apartmentId;

  constructor(private location: Location,
              private route: ActivatedRoute,
              private service: ApartmentsService) { }

  ngOnInit() {
    this.apartmentId = this.route.snapshot.paramMap.get('apartmentId');
    this.apartment = this.service.getById(this.apartmentId);
  }

  save(apartment) {
    this.service.updateApartment(this.apartmentId, apartment).pipe().subscribe(() => {
      this.location.back();
    });
  }
}
