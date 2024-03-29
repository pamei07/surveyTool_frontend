import {Component, Input} from '@angular/core';
import {Survey} from "../../../../model/survey";

@Component({
  selector: 'app-question-group-delete',
  templateUrl: 'question-group-delete.component.html'
})

export class QuestionGroupDeleteComponent {

  @Input() survey!: Survey;
  @Input() indexQuestionGroup!: number;

  deleteQuestionGroup(indexQuestionGroup: number) {
    this.survey.questionGroups?.splice(indexQuestionGroup, 1);
  }

}
