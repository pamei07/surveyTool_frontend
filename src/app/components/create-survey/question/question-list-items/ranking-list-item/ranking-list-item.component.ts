import {Component, Input, OnInit} from '@angular/core';
import {Survey} from "../../../../../model/survey";
import {Question} from "../../../../../model/question";

@Component({
  selector: 'app-ranking-list-item',
  templateUrl: './ranking-list-item.component.html'
})
export class RankingListItemComponent implements OnInit {

  @Input() survey!: Survey;
  @Input() question!: Question;
  @Input() indexQuestionGroup!: number;
  @Input() indexQuestion!: number;

  constructor() {
  }

  ngOnInit(): void {
  }

}
