import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApartmentsService } from '../apartments.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/shared/components/alert/alert.service';

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.scss']
})
export class ReservationListComponent implements OnInit {
  public reservationsLoaded: Boolean = false;
  private pageable: any;
  public reservations: any = [];
  params: any = {
    size: environment.constants.pageSize
  };
  apartmentId;


  headElements = ['No.', 'Reserved places', 'Date from', 'Date till', 'Creation date'];

  constructor(private apartmentsService: ApartmentsService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private alertService: AlertService) { }

  ngOnInit() {
    this.apartmentId = this.activatedRoute.snapshot.paramMap.get('apartmentId');
    this.activatedRoute.queryParams.subscribe(result => {
      if (result.page !== undefined) {
        this.params.page = result.page;
      }
      this.loadReservations();
    });
  }

  private loadReservations() {
    this.reservationsLoaded = false;
    this.router.navigate([`/apartments/${this.apartmentId}/reservation`], {queryParams: {page: this.params.page}});
    this.apartmentsService.getReservationList(this.apartmentId, this.params).pipe().subscribe(result => {
      this.pageable = result;
      this.reservations = this.pageable.content;
      this.reservationsLoaded = true;
    }, error => {
      this.reservationsLoaded = true;
      this.alertService.error(error.error.message);
    });
  }

  previousPage() {
    this.params.page = this.pageable.number - 1;
    this.loadReservations();
  }

  nextPage() {
    this.params.page = this.pageable.number + 1;
    this.loadReservations();
  }

}
