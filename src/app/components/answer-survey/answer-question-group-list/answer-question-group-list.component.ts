import {Component, Input, OnInit} from '@angular/core';
import {Survey} from "../../../model/survey";

@Component({
  selector: 'answer-question-group-list',
  templateUrl: 'answer-question-group-list.component.html'
})

export class AnswerQuestionGroupListComponent implements OnInit {

  @Input() survey!: Survey;

  constructor() {
  }

  ngOnInit() {
  }
}
