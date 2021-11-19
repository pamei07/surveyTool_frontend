import {Component, Input, OnInit} from '@angular/core';
import {Survey} from "../../../model/survey";

@Component({
  selector: 'survey-overview',
  templateUrl: 'survey-overview.component.html'
})

export class SurveyOverviewComponent implements OnInit {

  @Input() survey!: Survey;

  constructor() {
  }

  ngOnInit() {
  }
}
