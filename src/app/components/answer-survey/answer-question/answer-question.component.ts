import {Component, Input, OnInit} from '@angular/core';
import {FormGroup, FormGroupDirective} from "@angular/forms";
import {Question} from "../../../model/question";

@Component({
  selector: 'answer-question',
  templateUrl: 'answer-question.component.html'
})

export class AnswerQuestionComponent implements OnInit {

  @Input() questionGroupIndex!: number;
  @Input() question!: Question;
  @Input() questionIndex!: number;
  parentForm!: FormGroup;

  get text() {
    return this.parentForm.get('questionGroupsFormArray')
      ?.get(this.questionGroupIndex.toString())
      ?.get(this.questionIndex.toString());
  }

  get checkboxId() {
    return this.parentForm.get('questionGroupsFormArray')
      ?.get(this.questionGroupIndex.toString())
      ?.get(this.questionIndex.toString())
      ?.get('checkboxId');
  }

  constructor(private parentFormGroup: FormGroupDirective) {
  }

  ngOnInit() {
    this.parentForm = this.parentFormGroup.control;
  }
}
