import {Component, Input} from '@angular/core';
import {Survey} from "../../../../model/survey";

@Component({
  selector: 'app-question-list',
  templateUrl: 'question-list.component.html'
})

export class QuestionListComponent {

  @Input() survey!: Survey;
  @Input() indexQuestionGroup!: number;

}
