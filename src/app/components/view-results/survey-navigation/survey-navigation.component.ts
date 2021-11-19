import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Survey} from "../../../model/survey";

@Component({
  selector: 'survey-navigation',
  templateUrl: 'survey-navigation.component.html'
})

export class SurveyNavigationComponent implements OnInit {

  @Input() survey!: Survey;
  @Output() overviewResultsEventEmitter = new EventEmitter<boolean>();
  overview: boolean = true;

  constructor() {
  }

  ngOnInit() {
  }

  navigateOverview(bool: boolean) {
    this.overview = bool;
    this.overviewResultsEventEmitter.emit(bool);
  }
}
