import {Component, EventEmitter, Input, Output} from '@angular/core';
import {QuestionGroup} from "../../../../model/question-group";

@Component({
  selector: 'app-table-of-contents-paginator',
  templateUrl: './table-of-contents-paginator.component.html'
})
export class TableOfContentsPaginatorComponent {

  @Input() questionGroups!: QuestionGroup[];
  @Output() pageNumberEventEmitter = new EventEmitter<number>();

  emitPageNumber(page: number) {
    this.pageNumberEventEmitter.emit(page);
  }
}
