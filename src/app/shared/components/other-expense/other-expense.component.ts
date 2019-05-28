import {Component, Input} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'other-expense',
  templateUrl: './other-expense.component.html',
  styleUrls: ['./other-expense.component.scss']
})
export class OtherExpenseComponent {

  @Input() label: string;
  @Input() submitted: boolean;
  @Input() formGroup: FormGroup;
  expanded = false;
  constructor() { }

  get f() {
    return this.formGroup.controls;
  }

  expand() {
    this.expanded = !this.expanded;
  }
}
