import {Component, Input} from '@angular/core';
import {QuestionGroup} from "../../../../model/question-group";

@Component({
  selector: 'app-question-group-results-list-item',
  templateUrl: 'question-group-results-list-item.component.html'
})

export class QuestionGroupResultsListItemComponent {

  @Input() questionGroup!: QuestionGroup;
  answersCollapsed: boolean = false;

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
