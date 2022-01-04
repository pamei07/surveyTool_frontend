import {Component, Input} from '@angular/core';
import {Survey} from "../../../model/survey";

@Component({
  selector: 'app-survey-paginator',
  templateUrl: './survey-paginator.component.html'
})
export class SurveyPaginatorComponent {

  @Input() surveys!: Survey[];
  // paginatorTypes: 'openAccess', 'mySurveys'
  @Input() paginatorType!: String;
  // sortedBy: 'startDate', 'endDate'
  sortedBy!: String;

  page: number = 1;
  pageSize: number = 5;


  currentDateInRange(survey: Survey): boolean {
    // DF => date format
    let startDateDF = Date.parse(survey.startDate);
    let endDateDF = Date.parse(survey.endDate);
    let currentDateDF = Date.now();

    return currentDateDF > startDateDF && currentDateDF < endDateDF;
  }

  sortByEndDate() {
    // Skip sorting if already done
    if (this.sortedBy === 'endDate') {
      return;
    }

    this.surveys.sort((survey1, survey2) => {
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
    this.sortedBy = 'endDate';
    this.page = 1;
  }

  sortByStartDate() {
    // Skip sorting if already done
    if (this.sortedBy === 'startDate') {
      return;
    }

    this.surveys.sort((survey1, survey2) => {
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
    this.sortedBy = 'startDate';
    this.page = 1;
  }
}
