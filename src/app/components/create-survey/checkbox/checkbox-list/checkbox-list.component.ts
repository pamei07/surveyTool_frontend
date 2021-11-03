import {Component, Input, OnInit} from '@angular/core';
import {Survey} from "../../../../model/survey";

@Component({
  selector: 'checkbox-list',
  templateUrl: 'checkbox-list.component.html'
})

export class CheckboxListComponent implements OnInit {

  @Input() survey!: Survey;
  @Input() indexQuestionGroup!: number;
  @Input() indexQuestion!: number;

  constructor() {
  }

  ngOnInit() {
  }

}
