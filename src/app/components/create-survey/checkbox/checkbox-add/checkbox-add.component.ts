import {Component, Input} from '@angular/core';
import {Survey} from "../../../../model/survey";
import {Checkbox} from "../../../../model/checkbox";
import {FormBuilder, Validators} from "@angular/forms";
import {stringNotEmpty} from "../../../../directives/string-validation.directive";

@Component({
  selector: 'app-checkbox-add',
  templateUrl: 'checkbox-add.component.html'
})

export class CheckboxAddComponent {

  @Input() survey!: Survey;
  @Input() indexQuestionGroup!: number;
  @Input() indexQuestion!: number;

  checkboxForm = this.fb.group({
    text: ['', [Validators.required, Validators.maxLength(255), stringNotEmpty()]],
    hasTextField: false
  })

  initialFormValues = this.checkboxForm.value;

  get text() {
    return this.checkboxForm.get('text');
  }

  constructor(private fb: FormBuilder) {
  }

  addCheckboxToQuestion() {
    let checkbox = new Checkbox();
    checkbox.text = this.checkboxForm.value.text;
    checkbox.hasTextField = this.checkboxForm.value.hasTextField;

    this.survey
      .questionGroups![this.indexQuestionGroup]
      .questions![this.indexQuestion]
      .checkboxGroup!
      .checkboxes!.push(checkbox);

    this.checkboxForm.reset(this.initialFormValues);
  }

}
