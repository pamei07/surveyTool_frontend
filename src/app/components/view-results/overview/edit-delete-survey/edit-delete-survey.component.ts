import {Component, Input} from '@angular/core';
import {Survey} from "../../../../model/survey";

@Component({
  selector: 'app-edit-delete-survey',
  templateUrl: './edit-delete-survey.component.html'
})
export class EditDeleteSurveyComponent {

  @Input() survey!: Survey;

}
