import {Component, Input, OnInit} from '@angular/core';
import {Question} from "../../../../model/question";
import {FormGroup, FormGroupDirective} from "@angular/forms";

@Component({
  selector: 'answer-radio-question',
  templateUrl: 'answer-radio-question.component.html'
})

export class AnswerRadioQuestionComponent implements OnInit {

  @Input() questionGroupIndex!: number;
  @Input() question!: Question;
  @Input() questionIndex!: number;
  parentForm!: FormGroup;

  get checkboxId() {
    return this.parentForm.get('questionGroupsFormArray')
      ?.get(this.questionGroupIndex.toString())
      ?.get(this.questionIndex.toString())
      ?.get('checkboxId');
  }

  get text() {
    return this.parentForm.get('questionGroupsFormArray')
      ?.get(this.questionGroupIndex.toString())
      ?.get(this.questionIndex.toString())
      ?.get('text');
  }

  constructor(private parentFormGroup: FormGroupDirective) {
  }

  ngOnInit() {
    this.parentForm = this.parentFormGroup.control;
  }
}
