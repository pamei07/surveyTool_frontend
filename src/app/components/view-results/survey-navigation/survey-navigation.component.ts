import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Survey} from "../../../model/survey";

@Component({
  selector: 'app-survey-navigation',
  templateUrl: 'survey-navigation.component.html'
})

export class SurveyNavigationComponent {

  @Input() survey!: Survey;
  @Output() overviewResultsEventEmitter = new EventEmitter<boolean>();
  overview: boolean = true;

  navigateOverview(bool: boolean) {
    this.overview = bool;
    this.overviewResultsEventEmitter.emit(bool);
  }
}
