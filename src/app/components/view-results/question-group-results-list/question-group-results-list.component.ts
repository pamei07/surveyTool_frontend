import {Component, Input, OnInit} from '@angular/core';
import {QuestionGroup} from "../../../model/question-group";

@Component({
  selector: 'app-question-group-results-list',
  templateUrl: './question-group-results-list.component.html'
})
export class QuestionGroupResultsListComponent implements OnInit {

  @Input() questionGroups!: QuestionGroup[];

  constructor() {
  }

  ngOnInit(): void {
  }

}
