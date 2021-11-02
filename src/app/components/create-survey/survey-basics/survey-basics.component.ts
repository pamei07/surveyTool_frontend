import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormGroup, FormGroupDirective} from "@angular/forms";

@Component({
  selector: 'survey-basics',
  templateUrl: 'survey-basics.component.html'
})

export class SurveyBasicsComponent implements OnInit {

  parentForm!: FormGroup;
  @Output() basicInfoBoolean = new EventEmitter<boolean>();

  constructor(private parentFormGroup: FormGroupDirective) {
  }

  ngOnInit() {
    this.parentForm = this.parentFormGroup.control;
  }

  sendBasicInfoTrue() {
    this.basicInfoBoolean.emit(true);
  }
}
