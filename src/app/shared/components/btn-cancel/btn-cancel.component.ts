import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'btn-cancel',
  templateUrl: './btn-cancel.component.html',
  styleUrls: ['./btn-cancel.component.scss']
})
export class BtnCancelComponent {

  @Input() label: string;
  @Input() isDisabled: boolean;

  @Output('onClick') click: EventEmitter<any>;

  constructor() {
    this.click = new EventEmitter<any>();
  }

  onClick() {
    this.click.emit();
  }
}
