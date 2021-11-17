import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Survey} from "../../../model/survey";
import {User} from "../../../model/user";

@Component({
  selector: 'survey-intro',
  templateUrl: 'survey-intro.component.html'
})

export class SurveyIntroComponent implements OnInit {

  @Input() survey!: Survey;
  @Input() user!: User;
  @Input() surveyNotFound!: boolean;
  @Input() withinTimeFrame!: boolean;
  @Output() participateBoolean = new EventEmitter<boolean>();

  constructor() {

  }

  ngOnInit() {
  }

  participate() {
    this.participateBoolean.emit(true);
  }
}
