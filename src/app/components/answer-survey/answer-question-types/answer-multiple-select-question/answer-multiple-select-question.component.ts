import {Component, Input, OnInit} from '@angular/core';
import {Question} from "../../../../model/question";
import {AbstractControl, FormControl, FormGroup, FormGroupDirective} from "@angular/forms";
import {Checkbox} from "../../../../model/checkbox";

@Component({
  selector: 'answer-multiple-select-question',
  templateUrl: 'answer-multiple-select-question.component.html'
})

export class AnswerMultipleSelectQuestionComponent implements OnInit {

  @Input() questionGroupIndex!: number;
  @Input() question!: Question;
  @Input() questionIndex!: number;
  parentForm!: FormGroup;

  getCheckedFieldByCheckboxIndex(checkboxIndex: number): AbstractControl {
    return <FormControl>this.parentForm.get('questionGroupsFormArray')
      ?.get(this.questionGroupIndex.toString())
      ?.get(this.questionIndex.toString())
      ?.get(checkboxIndex.toString())
      ?.get('checked');
  }

  getTextFieldByCheckboxIndex(checkboxIndex: number) {
    return this.parentForm.get('questionGroupsFormArray')
      ?.get(this.questionGroupIndex.toString())
      ?.get(this.questionIndex.toString())
      ?.get(checkboxIndex.toString())
      ?.get('text');
  }

  get checkboxArray() {
    return this.parentForm.get('questionGroupsFormArray')
      ?.get(this.questionGroupIndex.toString())
      ?.get(this.questionIndex.toString())
  }

  constructor(private parentFormGroup: FormGroupDirective) {
  }

  ngOnInit() {
    this.parentForm = this.parentFormGroup.control;
  }

  enableDisableTextFieldIfAvailable(checkbox: Checkbox, checkboxIndex: number) {
    let currentCheckboxTextField = this.checkboxArray?.get(checkboxIndex.toString())?.get('text');

    if (checkbox.hasTextField) {
      if (currentCheckboxTextField?.disabled) {
        currentCheckboxTextField?.enable();
      } else if (currentCheckboxTextField?.enabled) {
        currentCheckboxTextField?.disable();
      }
    }
  }
}
