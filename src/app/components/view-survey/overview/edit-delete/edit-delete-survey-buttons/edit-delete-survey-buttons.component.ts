import {Component, Input} from '@angular/core';
import {Survey} from "../../../../../model/survey";

@Component({
  selector: 'app-edit-delete-survey',
  templateUrl: './edit-delete-survey-buttons.component.html'
})
export class EditDeleteSurveyButtonsComponent {

  @Input() survey!: Survey;

}
