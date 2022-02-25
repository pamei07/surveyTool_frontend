import {Component, Input} from '@angular/core';
import {Survey} from "../../../../../model/survey";
import {Question} from "../../../../../model/question";

@Component({
  selector: 'app-ranking-list-item',
  templateUrl: './ranking-list-item.component.html'
})
export class RankingListItemComponent {

  @Input() survey!: Survey;
  @Input() question!: Question;
  @Input() indexQuestionGroup!: number;
  @Input() indexQuestion!: number;

  get rankingGroup() {
    return this.survey.questionGroups[this.indexQuestionGroup].questions[this.indexQuestion].rankingGroup;
  }

}
