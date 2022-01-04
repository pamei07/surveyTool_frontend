import {Component, Input} from '@angular/core';
import {Survey} from "../../../../model/survey";
import {environment} from "../../../../../environments/environment";

@Component({
  selector: 'app-survey-access-details',
  templateUrl: 'survey-access-details.component.html'
})

export class SurveyAccessDetailsComponent {

  @Input() survey!: Survey;

  readonly baseUrl: string = environment.frontendUrl;

}
