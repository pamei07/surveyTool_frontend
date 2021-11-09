import {Component, Input, OnInit} from '@angular/core';
import {Answer} from "../../../../model/answer";
import {Checkbox} from "../../../../model/checkbox";

@Component({
  selector: 'checkbox-text-answers',
  templateUrl: 'checkbox-text-answers.component.html'
})

export class CheckboxTextAnswersComponent implements OnInit {

  @Input() answers!: Answer[];
  @Input() checkbox!: Checkbox;

  constructor() {
  }

  ngOnInit() {
  }
}
