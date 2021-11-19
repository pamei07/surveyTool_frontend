import {Component, Input} from '@angular/core';
import {Survey} from "../../../../model/survey";

@Component({
  selector: 'app-question-delete',
  templateUrl: 'question-delete.component.html'
})

export class QuestionDeleteComponent {

  @Input() survey!: Survey;
  @Input() indexQuestionGroup!: number;
  @Input() indexQuestion!: number;

  deleteQuestion(indexQuestion: number) {
    this.survey.questionGroups![this.indexQuestionGroup].questions!.splice(indexQuestion, 1);
  }
}
