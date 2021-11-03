import {Component, Input, OnInit} from '@angular/core';
import {Survey} from "../../../../model/survey";

@Component({
  selector: 'checkbox-list',
  templateUrl: 'checkbox-list.component.html'
})

export class CheckboxListComponent implements OnInit {

  @Input() indexQuestion!: number;
  @Input() indexQuestionGroup!: number;
  @Input() survey!: Survey;

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
