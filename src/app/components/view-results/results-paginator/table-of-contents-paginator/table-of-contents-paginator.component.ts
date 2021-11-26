import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {QuestionGroup} from "../../../../model/question-group";

@Component({
  selector: 'app-table-of-contents-paginator',
  templateUrl: './table-of-contents-paginator.component.html'
})
export class TableOfContentsPaginatorComponent implements OnInit {

  @Input() questionGroups!: QuestionGroup[];
  @Output() pageNumberEventEmitter = new EventEmitter<number>();

  constructor() {
  }

  ngOnInit(): void {
  }

  emitPageNumber(page: number) {
    this.pageNumberEventEmitter.emit(page);
  }
}
