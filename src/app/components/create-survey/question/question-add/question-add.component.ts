import {Component, Input} from '@angular/core';
import {Survey} from "../../../../model/survey";
import {FormBuilder, Validators} from "@angular/forms";
import {Question} from "../../../../model/question";
import {CheckboxGroup} from "../../../../model/checkbox-group";
import {
  atLeastOneCheckboxIfQuestionRequired,
  maxSelectGreaterThanEqualsMinSelectValidator
} from "../../../../directives/min-max-select-validation.directive";
import {stringNotEmpty} from "../../../../directives/string-validation.directive";

@Component({
  selector: 'app-question-add',
  templateUrl: 'question-add.component.html'
})

export class QuestionAddComponent {

  @Input() survey!: Survey;
  @Input() indexQuestionGroup!: number;

  questionForm = this.fb.group({
    text: ['', [Validators.required, Validators.maxLength(500), stringNotEmpty()]],
    required: false,
    hasCheckbox: false,
    checkboxGroup: this.fb.group({
      multipleSelect: false,
      minSelect: [{value: '0', disabled: true}, [Validators.required, Validators.min(0)]],
      maxSelect: [{value: '2', disabled: true}, [Validators.required, Validators.min(2)]]
    })
  }, {validators: [maxSelectGreaterThanEqualsMinSelectValidator(), atLeastOneCheckboxIfQuestionRequired()]})

  initialFormValues = this.questionForm.value;

  get text() {
    return this.questionForm.get('text');
  }

  get minSelect() {
    return this.questionForm.get('checkboxGroup')?.get('minSelect');
  }

  get maxSelect() {
    return this.questionForm.get('checkboxGroup')?.get('maxSelect');
  }

  constructor(private fb: FormBuilder) {
  }

  addNewQuestion() {
    if (this.questionForm.invalid) {
      console.log('Form invalid!');
      return;
    }

    let question = new Question();
    question.text = this.questionForm.value.text;
    question.required = this.questionForm.value.required;
    question.hasCheckbox = this.questionForm.value.hasCheckbox;

    if (question.hasCheckbox) {
      let checkboxGroup = new CheckboxGroup();
      checkboxGroup.multipleSelect = this.questionForm.value.checkboxGroup.multipleSelect;
      if (!this.minSelect?.disabled && !this.maxSelect?.disabled) {
        checkboxGroup.minSelect = this.minSelect?.value;
        checkboxGroup.maxSelect = this.maxSelect?.value;
      } else {
        checkboxGroup.minSelect = 0;
        checkboxGroup.maxSelect = 2;
      }

      question.checkboxGroup = checkboxGroup;
    }

    this.survey.questionGroups![this.indexQuestionGroup].questions!.push(question);

    // If minSelect/maxSelect have been enabled => disable them
    if (this.minSelect?.enabled && this.maxSelect?.enabled) {
      this.enableDisableMinMaxInput();
    }

    // Reset to initial values so that unchecked checkboxes do not result in null
    this.questionForm.reset(this.initialFormValues);
    this.questionForm.patchValue({checkboxGroup: {minSelect: 0, maxSelect: 2}});
  }

  enableDisableMinMaxInput() {
    if (this.minSelect?.enabled && this.maxSelect?.enabled) {
      this.minSelect?.disable();
      this.maxSelect?.disable();
    } else if (this.minSelect?.disabled && this.maxSelect?.disabled) {
      this.minSelect?.enable();
      this.maxSelect?.enable();
    }
  }

  collapseMultipleSelectContainerWhenOpen(indexQuestionGroup: number) {
    if (document.getElementById("checkboxGroupForm" + indexQuestionGroup)!.classList.contains('show')) {
      document.getElementById('checkboxGroupForm' + indexQuestionGroup)!.classList.remove('show');
    }
  }
}
