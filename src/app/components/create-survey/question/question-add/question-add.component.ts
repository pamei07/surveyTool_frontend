import {Component, Input, OnInit} from '@angular/core';
import {Survey} from "../../../../model/survey";
import {FormBuilder, Validators} from "@angular/forms";
import {Question} from "../../../../model/question";
import {CheckboxGroup} from "../../../../model/checkbox-group";
import {maxSelectGreaterThanMinSelectValidator} from "../../../../directives/min-max-select-validation.directive";

@Component({
  selector: 'question-add',
  templateUrl: 'question-add.component.html'
})

export class QuestionAddComponent implements OnInit {

  @Input() survey!: Survey;
  @Input() indexQuestionGroup!: number;

  disableInput: boolean = false;

  questionForm = this.fb.group({
    text: ['', [Validators.required]],
    required: false,
    hasCheckbox: false,
    checkboxGroup: this.fb.group({
      multipleSelect: false,
      minSelect: [{value: '0', disabled: true}, [Validators.required, Validators.min(0)]],
      maxSelect: [{value: '2', disabled: true}, [Validators.required, Validators.min(2)]]
    })
  }, {validators: maxSelectGreaterThanMinSelectValidator()})

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

  ngOnInit() {

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
      checkboxGroup.minSelect = this.questionForm.value.checkboxGroup.minSelect;
      checkboxGroup.maxSelect = this.questionForm.value.checkboxGroup.maxSelect;

      question.checkboxGroup = checkboxGroup;
    }

    this.survey.questionGroups![this.indexQuestionGroup].questions!.push(question);

    // If minSelect/maxSelect have been enabled => disable them
    if (this.disableInput) {
      this.questionForm.get('checkboxGroup')?.get('minSelect')?.disable();
      this.questionForm.get('checkboxGroup')?.get('maxSelect')?.disable();
      this.disableInput = false;
    }

    // Reset to initial values so that unchecked checkboxes do not result in null
    this.questionForm.reset(this.initialFormValues);
  }

  enableDisableMinMaxInput() {
    if (this.disableInput) {
      this.questionForm.get('checkboxGroup')?.get('minSelect')?.disable();
      this.questionForm.get('checkboxGroup')?.get('maxSelect')?.disable();
      this.disableInput = false;
    } else {
      this.questionForm.get('checkboxGroup')?.get('minSelect')?.enable();
      this.questionForm.get('checkboxGroup')?.get('maxSelect')?.enable();
      this.disableInput = true;
    }
  }

  collapseMultipleSelectContainerWhenOpen(indexQuestionGroup: number) {
    if (document.getElementById("checkboxGroupForm" + indexQuestionGroup)!.classList.contains('show')) {
      document.getElementById('checkboxGroupForm' + indexQuestionGroup)!.classList.remove('show');
    }
  }
}
