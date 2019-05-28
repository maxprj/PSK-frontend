import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'btn-primary',
  templateUrl: './btn-primary.component.html',
  styleUrls: ['./btn-primary.component.scss']
})
export class BtnPrimaryComponent {

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
