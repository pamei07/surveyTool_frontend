import {Component, Input, OnInit} from '@angular/core';
import {QuestionGroup} from "../../../model/question-group";

@Component({
  selector: 'app-question-group-page',
  templateUrl: './question-group-page.component.html'
})
export class QuestionGroupPageComponent implements OnInit {

  @Input() questionGroup!: QuestionGroup;

  constructor() {
  }

  ngOnInit(): void {
  }

  scrollToHeading(id: string) {
    let element = document.getElementById(id);
    element?.scrollIntoView();
  }
}
