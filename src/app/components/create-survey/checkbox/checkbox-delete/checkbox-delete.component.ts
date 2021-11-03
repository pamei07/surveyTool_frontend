import {Component, Input, OnInit} from '@angular/core';
import {Survey} from "../../../../model/survey";

@Component({
  selector: 'checkbox-delete',
  templateUrl: 'checkbox-delete.component.html'
})

export class CheckboxDeleteComponent implements OnInit {

  @Input() survey!: Survey
  @Input() indexQuestionGroup!: number;
  @Input() indexQuestion!: number;
  @Input() indexCheckbox!: number;

  constructor() {
  }

  ngOnInit() {
  }

  deleteCheckbox(indexCheckbox: number) {
    this.survey
      .questionGroups![this.indexQuestionGroup]
      .questions![this.indexQuestion]
      .checkboxGroup!
      .checkboxes!.splice(indexCheckbox, 1);
  }
}
