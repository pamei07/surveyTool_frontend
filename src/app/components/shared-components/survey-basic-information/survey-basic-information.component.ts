import {Component, Input, OnInit} from '@angular/core';
import {Survey} from "../../../model/survey";

@Component({
  selector: 'survey-basic-information',
  templateUrl: 'survey-basic-information.component.html'
})

export class SurveyBasicInformationComponent implements OnInit {

  @Input() survey!: Survey;

  constructor() {
  }

  ngOnInit() {
  }
}
