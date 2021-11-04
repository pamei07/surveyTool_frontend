import {Component, Input, OnInit} from '@angular/core';
import {Question} from "../../../../model/question";
import {FormGroup, FormGroupDirective} from "@angular/forms";

@Component({
  selector: 'answer-multiple-select-question',
  templateUrl: 'answer-multiple-select-question.component.html'
})

export class AnswerMultipleSelectQuestionComponent implements OnInit {

  @Input() questionGroupIndex!: number;
  @Input() question!: Question;
  @Input() questionIndex!: number;
  parentForm!: FormGroup;

  get text() {
    return this.parentForm.get('questionGroupsFormArray')
      ?.get(this.questionGroupIndex.toString())
      ?.get(this.questionIndex.toString())
      ?.get('text');
  }

  get checked() {
    return this.parentForm.get('questionGroupsFormArray')
      ?.get(this.questionGroupIndex.toString())
      ?.get(this.questionIndex.toString())
      ?.get('checked');
  }

  constructor(private parentFormGroup: FormGroupDirective) {
  }

  ngOnInit() {
    this.parentForm = this.parentFormGroup.control;
  }
}
