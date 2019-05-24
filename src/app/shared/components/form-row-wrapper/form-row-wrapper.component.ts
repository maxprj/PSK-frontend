import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'form-row',
  templateUrl: './form-row-wrapper.component.html',
  styleUrls: ['./form-row-wrapper.component.scss']
})
export class FormRowWrapperComponent {

  @Input() forInput: string;
  @Input() label: string;
  @Input() isInvalid: boolean;
  @Input() errorText: string;
  constructor() { }
}
