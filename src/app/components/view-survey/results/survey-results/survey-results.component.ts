import {Component, Input} from '@angular/core';
import {Survey} from "../../../../model/survey";

@Component({
  selector: 'app-survey-results',
  templateUrl: 'survey-results.component.html'
})

export class SurveyResultsComponent {

  @Input() survey!: Survey;
  listView: boolean = true;

  get questionGroups() {
    return this.survey.questionGroups;
  }

  toggleView(bool: boolean) {
    this.listView = bool;
  }
}
