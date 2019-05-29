import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TripsService} from '../trips.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AlertService} from "../../shared/components/alert/alert.service";
import {environment} from '../../../environments/environment';
import {TripUserAddModalComponent} from '../trip-user-add-modal/trip-user-add-modal.component';
import {TripsMergeModalComponent} from '../trips-merge-modal/trips-merge-modal.component';
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-trip-list',
  templateUrl: './trip-list.component.html',
  styleUrls: ['./trip-list.component.scss']
})
export class TripListComponent implements OnInit {

  tripsLoaded = false;
  headElements = ['#', 'Name', 'Departure point', 'Destination point', 'Departure time', 'Status',  'Details', 'Merge', 'Delete'];
  pageable: any;
  trips: any = [];
  params: any = {
    size: environment.constants.pageSize
  };
  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private tripService: TripsService,
              private alertService: AlertService,
              private modalService: NgbModal) { }

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
    this.tripService.getAllTrips(this.params).pipe().subscribe(result => {
      this.pageable = result;
      this.trips = result.content;
      this.tripsLoaded = true;
    }, error => {
      this.tripsLoaded = true;
      this.alertService.error(error.error.message);
    });
  }

  addTrip() {
      this.router.navigate(['trips', 'add']);
  }

  deleteTrip(id) {
    this.tripService.deleteTrip(id).pipe().subscribe(() => {
      this.loadTrips();
    }, error => {
      this.alertService.error(error.error.message);
    });
  }

  nextPage() {
    this.params.page = this.pageable.number + 1;
    this.loadTrips();
  }

  previousPage() {
    this.params.page = this.pageable.number - 1;
    this.loadTrips();
  }

  mergeTrips(id) {
    const modalRef = this.modalService.open(TripsMergeModalComponent,
      {
        size: 'lg',
        windowClass: 'show'
      });
    modalRef.componentInstance.tripId = id;
    modalRef.result.then((result) => {
      this.loadTrips();
    }).catch((error) => {

    });
  }

}
