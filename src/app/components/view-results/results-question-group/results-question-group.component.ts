import {Component, Input, OnInit} from '@angular/core';
import {QuestionGroup} from "../../../model/question-group";

@Component({
  selector: 'results-question-group',
  templateUrl: 'results-question-group.component.html'
})

export class ResultsQuestionGroupComponent implements OnInit {

  @Input() questionGroup!: QuestionGroup;
  answersCollapsed: boolean = false;

  constructor() {
  }

  ngOnInit() {
  }

  /**
   * Used to change the look of the collapse/open button
   */
  collapseAnswers() {
    this.answersCollapsed = !this.answersCollapsed;
  }

  scrollToHeading(id: string) {
    let element = document.getElementById(id);
    element?.scrollIntoView();
  }
}
