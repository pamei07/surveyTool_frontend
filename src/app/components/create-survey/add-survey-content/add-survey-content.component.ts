import {Component, Input, OnInit} from '@angular/core';
import {Survey} from "../../../model/survey";
import {FormGroup, FormGroupDirective} from "@angular/forms";

@Component({
  selector: 'app-add-survey-content',
  templateUrl: 'add-survey-content.component.html'
})

export class AddSurveyContentComponent implements OnInit {

  @Input() survey!: Survey;
  surveyForm!: FormGroup;

  constructor(private parentFormGroup: FormGroupDirective) {
  }

  ngOnInit() {
    this.surveyForm = this.parentFormGroup.control;
  }

}
