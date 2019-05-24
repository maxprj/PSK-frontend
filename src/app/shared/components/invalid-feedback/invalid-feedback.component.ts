import {Component, Input} from '@angular/core';

@Component({
  selector: 'invalid-feedback',
  templateUrl: './invalid-feedback.component.html',
  styleUrls: ['./invalid-feedback.component.scss']
})
export class InvalidFeedbackComponent {

  @Input() isInvalid: boolean;
  @Input() errorText: string;
  constructor() { }
}
