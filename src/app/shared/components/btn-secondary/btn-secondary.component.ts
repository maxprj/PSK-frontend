import {Component, Input} from '@angular/core';

@Component({
  selector: 'btn-secondary',
  templateUrl: './btn-secondary.component.html',
  styleUrls: ['./btn-secondary.component.scss']
})
export class BtnSecondaryComponent {

  @Input() label: string;
  @Input() isDisabled: boolean;

  constructor() { }

}
