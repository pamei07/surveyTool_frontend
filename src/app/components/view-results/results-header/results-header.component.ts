import {Component, OnInit} from '@angular/core';
import {Survey} from "../../../model/survey";

@Component({
  selector: 'results-header',
  templateUrl: 'results-header.component.html'
})

export class ResultsHeaderComponent implements OnInit {
  survey!: Survey;
  uniqueUserIds: number[] = [];

  constructor() {
  }

  ngOnInit() {
  }

  showSurvey(survey: Survey) {
    this.survey = survey;
    this.uniqueUserIds = [];
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
