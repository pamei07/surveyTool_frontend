import {Component, Input, OnInit} from '@angular/core';
import {Question} from "../../../../model/question";
import {FormGroup, FormGroupDirective} from "@angular/forms";
import {Checkbox} from "../../../../model/checkbox";

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

  disableEnableInput(currentCheckbox: Checkbox) {
    // Reset text value on click so that required-validation gets triggered when switching from a filled textfield
    // to an empty one
    this.text?.patchValue('');

    // If checkbox clicked has a text field => enable input field and field in FormGroup
    if (currentCheckbox.hasTextField) {
      (document.getElementById('checkbox' + currentCheckbox.id + 'text')! as HTMLInputElement).disabled = false;
      this.text?.enable();
    }
    // If checkbox clicked has no text field => disable field in FormGroup, so that 'required' validation does not get triggered
    else if (!currentCheckbox.hasTextField) {
      this.text?.disable();
    }
    // Disable text fields of every other checkbox (regardless if checkbox clicked has own text field)
    this.question.checkboxGroup?.checkboxes.forEach(checkbox => {
      if (checkbox.hasTextField && checkbox.id !== currentCheckbox.id) {
        if (!((document.getElementById('checkbox' + checkbox.id + 'text')! as HTMLInputElement).disabled)) {
          (document.getElementById('checkbox' + checkbox.id + 'text')! as HTMLInputElement).disabled = true;

        }
      }
    })
  }
}
