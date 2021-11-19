import {Component, Input, OnInit} from '@angular/core';
import {Survey} from "../../../model/survey";

@Component({
  selector: 'survey-results',
  templateUrl: 'survey-results.component.html'
})

export class SurveyResultsComponent implements OnInit {

  @Input() survey!: Survey;

  constructor() {
  }

  ngOnInit() {

  }
}
