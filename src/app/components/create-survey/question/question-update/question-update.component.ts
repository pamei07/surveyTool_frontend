import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Survey} from "../../../../model/survey";
import {
  atLeastOneCheckboxIfQuestionRequired,
  maxSelectGreaterThanEqualsMinSelectValidator
} from "../../../../directives/min-max-select-validation.directive";
import {stringNotEmpty} from "../../../../directives/string-validation.directive";

@Component({
  selector: 'app-question-update',
  templateUrl: 'question-update.component.html'
})

export class QuestionUpdateComponent implements OnInit {

  @Input() survey!: Survey;
  @Input() indexQuestionGroup!: number;
  @Input() indexQuestion!: number;

  updateForm = this.fb.group({
    text: ['', [Validators.required, Validators.maxLength(500), stringNotEmpty()]],
    required: false,
    checkboxGroup: this.fb.group({
      multipleSelect: false,
      minSelect: [{value: '0', disabled: true}, [Validators.required, Validators.min(0)]],
      maxSelect: [{value: '2', disabled: true}, [Validators.required, Validators.min(2)]]
    })
  }, {validators: [maxSelectGreaterThanEqualsMinSelectValidator(), atLeastOneCheckboxIfQuestionRequired()]})

  get text() {
    return this.updateForm.get('text');
  }

  get minSelect() {
    return this.updateForm.get('checkboxGroup')?.get('minSelect');
  }

  get maxSelect() {
    return this.updateForm.get('checkboxGroup')?.get('maxSelect');
  }

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    let questionToUpdate = this.survey.questionGroups![this.indexQuestionGroup].questions![this.indexQuestion];

    // If checkboxGroup.multipleSelect == true -> enable input fields on init
    if (questionToUpdate.checkboxGroup?.multipleSelect) {
      this.enableDisableMinMaxInput();
    }

    this.updateForm.patchValue({
      text: questionToUpdate.text,
      required: questionToUpdate.required,
    })

    if (questionToUpdate.hasCheckbox) {
      this.updateForm.patchValue({
        checkboxGroup: {
          multipleSelect: questionToUpdate.checkboxGroup!.multipleSelect,
          minSelect: questionToUpdate.checkboxGroup!.minSelect,
          maxSelect: questionToUpdate.checkboxGroup!.maxSelect
        }
      })
    }
  }

  updateQuestion(indexQuestion: number) {
    if (this.updateForm.invalid) {
      console.log('Form invalid!');
      return;
    }

    let questionToUpdate = this.survey.questionGroups![this.indexQuestionGroup].questions![indexQuestion];
    questionToUpdate.text = this.updateForm.value.text;
    questionToUpdate.required = this.updateForm.value.required;

    if (questionToUpdate.hasCheckbox) {
      let checkboxGroupToUpdate = questionToUpdate.checkboxGroup!;
      checkboxGroupToUpdate.multipleSelect = this.updateForm.value.checkboxGroup.multipleSelect;
      if (!this.minSelect?.disabled && !this.maxSelect?.disabled) {
        checkboxGroupToUpdate.minSelect = this.minSelect?.value;
        checkboxGroupToUpdate.maxSelect = this.maxSelect?.value;
      } else {
        checkboxGroupToUpdate.minSelect = 0;
        checkboxGroupToUpdate.maxSelect = 2;
      }

      questionToUpdate.checkboxGroup = checkboxGroupToUpdate;
    }

    this.survey.questionGroups![this.indexQuestionGroup].questions![indexQuestion] = questionToUpdate;
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
}
