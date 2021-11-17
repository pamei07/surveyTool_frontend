import {Component, Input, OnInit} from '@angular/core';
import {Survey} from "../../../model/survey";
import {User} from "../../../model/user";

@Component({
  selector: 'survey-basic-information',
  templateUrl: 'survey-basic-information.component.html'
})

export class SurveyBasicInformationComponent implements OnInit {

  @Input() survey!: Survey;
  @Input() user!: User;

  constructor() {
  }

  ngOnInit() {
  }
}
