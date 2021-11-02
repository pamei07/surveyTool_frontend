import {Component, OnInit} from '@angular/core';
import {Survey} from "../../../model/survey";

@Component({
  selector: 'results-overview',
  templateUrl: 'results-overview.component.html'
})

export class ResultsOverviewComponent implements OnInit {
  survey!: Survey;
  uniqueUserIds: number[] = [];

  constructor() {
  }

  ngOnInit() {
  }

  showSurvey(survey: Survey) {
    this.survey = survey;
    console.log(this.survey);
  }

  countUniqueIds(userIds: number[]) {
    userIds.forEach((userId) => {
      if (!this.uniqueUserIds.includes(userId)) {
        this.uniqueUserIds.push(userId);
      }
    })
  }
}
