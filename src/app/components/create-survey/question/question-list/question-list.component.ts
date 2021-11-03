import {Component, Input, OnInit} from '@angular/core';
import {Survey} from "../../../../model/survey";

@Component({
  selector: 'question-list',
  templateUrl: 'question-list.component.html'
})

export class QuestionListComponent implements OnInit {

  @Input() survey!: Survey;
  @Input() indexQuestionGroup!: number;

  constructor() {
  }

  ngOnInit() {
  }


}
