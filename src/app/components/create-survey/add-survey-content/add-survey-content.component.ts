import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Survey} from "../../../model/survey";

@Component({
  selector: 'add-survey-content',
  templateUrl: 'add-survey-content.component.html'
})

export class AddSurveyContentComponent implements OnInit {

  @Input() survey!: Survey;
  @Output() basicInfoBoolean = new EventEmitter<boolean>();

  constructor() {
  }

  ngOnInit() {
  }

  sendBasicInfoFalse() {
    this.basicInfoBoolean.emit(false);
  }
}
