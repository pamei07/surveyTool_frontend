import {Component, Input} from '@angular/core';
import {Survey} from "../../../model/survey";

@Component({
  selector: 'survey-results',
  templateUrl: 'survey-results.component.html'
})

export class SurveyResultsComponent {

  @Input() survey!: Survey;

}
