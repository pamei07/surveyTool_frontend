import {Component, Input} from '@angular/core';
import {Survey} from "../../../model/survey";

@Component({
  selector: 'survey-overview',
  templateUrl: 'survey-overview.component.html'
})

export class SurveyOverviewComponent {

  @Input() survey!: Survey;

}
