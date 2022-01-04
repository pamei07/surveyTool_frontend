import {Component, Input} from '@angular/core';
import {QuestionGroup} from "../../../../../../model/question-group";

@Component({
  selector: 'app-question-group-paginator',
  templateUrl: './question-group-paginator.component.html'
})
export class QuestionGroupPaginatorComponent {

  @Input() questionGroups!: QuestionGroup[];
  page: number = 1;
  pageSize: number = 1;

  goToPage(page: number) {
    this.page = page;
  }
}
