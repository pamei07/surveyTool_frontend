import {Component, Input, OnInit} from '@angular/core';
import {Answer} from "../../../../model/answer";
import {Checkbox} from "../../../../model/checkbox";

@Component({
  selector: 'results-checkbox-text-answers',
  templateUrl: 'results-checkbox-text-answers.component.html'
})

export class ResultsCheckboxTextAnswersComponent implements OnInit {

  @Input() answers!: Answer[];
  @Input() checkbox!: Checkbox;

  constructor() {
  }

  ngOnInit() {
  }
}
