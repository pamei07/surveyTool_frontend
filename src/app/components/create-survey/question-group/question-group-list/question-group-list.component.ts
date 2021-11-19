import {Component, Input} from '@angular/core';
import {Survey} from "../../../../model/survey";

@Component({
  selector: 'question-group-list',
  templateUrl: 'question-group-list.component.html'
})

export class QuestionGroupListComponent {

  @Input() survey!: Survey;

  constructor() {
  }

}
