import {Component, Input} from '@angular/core';
import {Survey} from "../../../../model/survey";
import {FormBuilder, Validators} from "@angular/forms";
import {stringNotEmpty} from "../../../../directives/string-validation.directive";
import {Option} from "../../../../model/option";

@Component({
  selector: 'app-option-add',
  templateUrl: './option-add.component.html'
})
export class OptionAddComponent {

  @Input() survey!: Survey;
  @Input() indexQuestionGroup!: number;
  @Input() indexQuestion!: number;

  optionForm = this.fb.group({
    text: ['', [Validators.required, Validators.maxLength(255), stringNotEmpty()]],
  })

  get text() {
    return this.optionForm.get('text');
  }

  constructor(private fb: FormBuilder) {
  }

  addOptionToQuestion() {
    let option = new Option();
    option.text = this.optionForm.value.text;

    this.survey
      .questionGroups[this.indexQuestionGroup]
      .questions[this.indexQuestion]
      .rankingGroup!
      .options.push(option);

    this.optionForm.reset();
  }
}
