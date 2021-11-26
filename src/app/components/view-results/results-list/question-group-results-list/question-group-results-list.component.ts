import {Component, Input} from '@angular/core';
import {QuestionGroup} from "../../../../model/question-group";

@Component({
  selector: 'app-question-group-results-list',
  templateUrl: './question-group-results-list.component.html'
})
export class QuestionGroupResultsListComponent {

  @Input() questionGroups!: QuestionGroup[];

}
