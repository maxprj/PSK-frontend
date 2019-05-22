import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {Apartment} from '../models/apartment';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Address} from '../models/address';

@Component({
  selector: 'app-apartment-add-modal',
  templateUrl: './apartment-add-modal.component.html',
  styleUrls: ['./apartment-add-modal.component.scss']
})
export class ApartmentAddModalComponent implements OnInit {
  @Input() id: string;
  @ViewChild('labelImport')
  labelImport: ElementRef;
  formSettings: FormGroup;

  constructor(public activeModal: NgbActiveModal,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.createForm();
  }

  private createForm() {
    this.formSettings = this.formBuilder.group({
      addressNo: ['', Validators.required],
      addressCity: ['', Validators.required],
      addressStreet: ['', Validators.required],
      apartmentSize: ['']
    });
  }

  public submitForm() {
    this.activeModal.close(this.buildApartmentObject());
  }

  private buildApartmentObject() {
    const tempApartment = new Apartment();
    const tempAddress = new Address();
    tempAddress.appartmentNumber = this.formSettings.get('addressNo').value;
    tempAddress.street = this.formSettings.get('addressStreet').value;
    tempAddress.city = this.formSettings.get('addressCity').value;
    tempApartment.size = this.formSettings.get('apartmentSize').value;
    tempApartment.address = tempAddress;
    return tempApartment;
  }

}
