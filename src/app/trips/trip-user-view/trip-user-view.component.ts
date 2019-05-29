import {Component, OnInit} from '@angular/core';
import {environment} from "../../../environments/environment";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AlertService} from "../../shared/components/alert/alert.service";
import {ActivatedRoute, Router} from "@angular/router";
import {TripsService} from "../trips.service";

@Component({
  selector: 'app-trip-user-view',
  templateUrl: './trip-user-view.component.html',
  styleUrls: ['./trip-user-view.component.scss']
})
export class TripUserViewComponent implements OnInit {


  tripsLoaded = false;
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
              private ngbModal: NgbModal) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(result => {
      if (result.page !== undefined) {
        this.params.page = result.page;
      }
      this.loadTrips();
    });
  }

  loadTrips() {
    this.tripsLoaded = false;
    this.router.navigate(['/trips'], {queryParams: {page: this.params.page}});
    this.tripService.listForUser(this.params).pipe().subscribe(result => {
      this.pageable = result;
      this.trips = result.content;
      this.tripsLoaded = true;
    }, error => {
      this.tripsLoaded = true;
      this.alertService.error(error.error.message);
    });
  }

  viewDetails(id: string) {

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
