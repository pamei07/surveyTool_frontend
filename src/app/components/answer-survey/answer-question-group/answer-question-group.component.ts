import {Component, Input, OnInit} from '@angular/core';
import {QuestionGroup} from "../../../model/question-group";
import {FormGroup, FormGroupDirective} from "@angular/forms";

@Component({
  selector: 'answer-question-group',
  templateUrl: 'answer-question-group.component.html'
})

export class AnswerQuestionGroupComponent implements OnInit {

  @Input() questionGroup!: QuestionGroup;
  @Input() questionGroupIndex!: number;
  parentForm!: FormGroup;

  constructor(private parentFormGroup: FormGroupDirective) {
  }

  ngOnInit() {
    this.parentForm = this.parentFormGroup.control;
  }
}
