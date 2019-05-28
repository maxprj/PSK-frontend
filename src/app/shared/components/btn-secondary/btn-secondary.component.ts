import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'btn-secondary',
  templateUrl: './btn-secondary.component.html',
  styleUrls: ['./btn-secondary.component.scss']
})
export class BtnSecondaryComponent {

  @Input() label: string;
  @Input() isDisabled: boolean;

  @Output() click: EventEmitter<any>;

  constructor() {
    this.click = new EventEmitter<any>();
  }

  onClick($event) {
    this.click.emit($event);
  }
}
