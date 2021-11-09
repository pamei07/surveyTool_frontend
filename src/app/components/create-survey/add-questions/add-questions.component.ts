import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Survey} from "../../../model/survey";

@Component({
  selector: 'add-questions',
  templateUrl: 'add-questions.component.html'
})

export class AddQuestionsComponent implements OnInit {

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
