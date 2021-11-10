import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {QuestionGroup} from "../../../model/question-group";
import {User} from "../../../model/user";

@Component({
  selector: 'results-question-group',
  templateUrl: 'results-question-group.component.html'
})

export class ResultsQuestionGroupComponent implements OnInit {

  @Input() questionGroup!: QuestionGroup;
  @Output() participants = new EventEmitter<User[]>();
  answersCollapsed: boolean = false;

  constructor() {
  }

  ngOnInit() {
  }

  passUsers(users: User[]) {
    this.participants.emit(users);
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
