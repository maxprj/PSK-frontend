import {Component, OnInit} from '@angular/core';
import {environment} from "../../../environments/environment";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AlertService} from "../../shared/components/alert/alert.service";
import {ActivatedRoute, Router} from "@angular/router";
import {TripsService} from "../trips.service";
import {TripEventDetailsComponent} from "../../shared/components/trip-event-details/trip-event-details.component";
import {catchError} from 'rxjs/operators';

@Component({
  selector: 'app-trip-user-view',
  templateUrl: './trip-user-view.component.html',
  styleUrls: ['./trip-user-view.component.scss']
})
export class TripUserViewComponent implements OnInit {

  loading = true;
  headElements = ['#', 'Name', 'Departure point', 'Destination point', 'Departure time', 'Status', 'Details'];
  pageable: any;
  trips: any = [];
  params: any = {
    size: environment.constants.pageSize
  };
  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private tripService: TripsService,
              private alertService: AlertService,
              private modal: NgbModal) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(result => {
      if (result.page !== undefined) {
        this.params.page = result.page;
      }
      this.loadTrips();
    });
  }

  loadTrips() {
    this.loading = true;
    this.router.navigate(['/trips/user'], {queryParams: {page: this.params.page}});
    this.tripService.listForUser(this.params).pipe().subscribe(result => {
      this.pageable = result;
      this.trips = result.content;
      this.loading = false;
    }, error => {
      this.loading = false;
      this.alertService.error(error.error.message);
    });
  }

  viewDetails(id: string) {
    const modalRef = this.modal.open(TripEventDetailsComponent,
      {
        size: 'lg',
        windowClass: 'show'
      });

    modalRef.componentInstance.id = id;
    modalRef.result.then(accepted => {
      if (!accepted) {
        this.loadTrips();
      }
    }).catch(() => {});
  }

  nextPage() {
    this.params.page = this.pageable.number + 1;
    this.loadTrips();
  }

  previousPage() {
    this.params.page = this.pageable.number - 1;
    this.loadTrips();
  }
}
