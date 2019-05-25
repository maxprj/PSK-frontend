import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent {

  @Input() pageable: any;
  @Output() nextPageClick = new EventEmitter<any>();
  @Output() previousPageClick = new EventEmitter<any>();
  constructor() { }

  nextPage() {
    this.nextPageClick.emit();
  }

  previousPage() {
    this.previousPageClick.emit();
  }
}
