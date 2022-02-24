import {Component, Input, OnInit} from '@angular/core';
import {Question} from "../../../../../model/question";
import {Survey} from "../../../../../model/survey";

@Component({
  selector: 'app-multiple-choice-list-item',
  templateUrl: './multiple-choice-list-item.component.html'
})
export class MultipleChoiceListItemComponent implements OnInit {

  @Input() survey!: Survey;
  @Input() question!: Question;
  @Input() indexQuestionGroup!: number;
  @Input() indexQuestion!: number;

  constructor() {
  }

  ngOnInit(): void {
  }

}
