import {Component, Input, OnInit} from '@angular/core';
import {QuestionGroup} from "../../../../model/question-group";

@Component({
  selector: 'app-question-group-paginator',
  templateUrl: './question-group-paginator.component.html'
})
export class QuestionGroupPaginatorComponent implements OnInit {

  @Input() questionGroups!: QuestionGroup[];
  page: number = 1;
  pageSize: number = 1;

  constructor() {
  }

  ngOnInit(): void {
  }

}
