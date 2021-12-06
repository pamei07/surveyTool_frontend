import {Component, OnInit} from '@angular/core';
import {SurveyService} from "../../../services/survey/survey.service";
import {Survey} from "../../../model/survey";

@Component({
  selector: 'app-survey-paginator',
  templateUrl: 'survey-paginator.component.html'
})

export class SurveyPaginatorComponent implements OnInit {

  openAccessSurveys!: Survey[];
  sortedByStartDate: boolean = true;

  page: number = 1;
  pageSize: number = 5;

  constructor(private surveyService: SurveyService) {
  }

  ngOnInit() {
    this.surveyService.findSurveysThatAreOpenAccess().subscribe((surveys) => {
      this.openAccessSurveys = surveys;
    })
  }

  currentDateInRange(survey: Survey): boolean {
    // DF => date format
    let startDateDF = Date.parse(survey.startDate);
    let currentDateDF = Date.now();

    return currentDateDF < startDateDF;
  }

  sortByEndDate() {
    this.openAccessSurveys.sort((survey1, survey2) => {
      let endDate1 = Date.parse(survey1.endDate);
      let endDate2 = Date.parse(survey2.endDate);
      if (endDate1 < endDate2) {
        return -1;
      }
      if (endDate1 > endDate2) {
        return 1;
      }
      return 0;
    })
    this.sortedByStartDate = false;
    this.page = 1;
  }

  sortByStartDate() {
    this.openAccessSurveys.sort((survey1, survey2) => {
      let startDate1 = Date.parse(survey1.startDate);
      let startDate2 = Date.parse(survey2.startDate);
      if (startDate1 < startDate2) {
        return -1;
      }
      if (startDate1 > startDate2) {
        return 1;
      }
      return 0;
    })
    this.sortedByStartDate = true;
    this.page = 1;
  }
}
