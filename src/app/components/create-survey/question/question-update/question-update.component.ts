import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Survey} from "../../../../model/survey";
import {
  atLeastOneCheckboxIfQuestionRequired,
  maxSelectGreaterThanEqualsMinSelectValidator
} from "../../../../directives/min-max-select-validation.directive";
import {stringNotEmpty} from "../../../../directives/string-validation.directive";
import {Question} from "../../../../model/question";

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
    }),
    rankingGroup: this.fb.group({
      lowestRated: ['', [Validators.required, Validators.maxLength(255), stringNotEmpty()]],
      highestRated: ['', [Validators.required, Validators.maxLength(255), stringNotEmpty()]]
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

  get lowestRated() {
    return this.updateForm.get('rankingGroup')?.get('lowestRated');
  }

  get highestRated() {
    return this.updateForm.get('rankingGroup')?.get('highestRated');
  }

  get question() {
    return this.survey.questionGroups[this.indexQuestionGroup].questions[this.indexQuestion];
  }

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    let questionToUpdate = this.question;

    // If checkboxGroup.multipleSelect == true -> enable input fields on init
    if (questionToUpdate.checkboxGroup?.multipleSelect) {
      this.enableDisableMinMaxInput();
    }

    this.updateForm.patchValue({
      text: questionToUpdate.text,
      required: questionToUpdate.required,
    })

    if (questionToUpdate.questionType === 'MULTIPLE_CHOICE') {
      this.patchMultipleChoiceUpdateForm(questionToUpdate);
    } else if (questionToUpdate.questionType === 'RANKING') {
      this.patchRankingUpdateForm(questionToUpdate);
    }
  }

  private patchMultipleChoiceUpdateForm(questionToUpdate: Question) {
    this.updateForm.patchValue({
      checkboxGroup: {
        multipleSelect: questionToUpdate.checkboxGroup!.multipleSelect,
        minSelect: questionToUpdate.checkboxGroup!.minSelect,
        maxSelect: questionToUpdate.checkboxGroup!.maxSelect
      }
    })
  }

  private patchRankingUpdateForm(questionToUpdate: Question) {
    this.updateForm.patchValue({
      rankingGroup: {
        lowestRated: questionToUpdate.rankingGroup?.lowestRated,
        highestRated: questionToUpdate.rankingGroup?.highestRated
      }
    })
  }

  updateQuestion(indexQuestion: number) {
    if (this.checkIfFormValid()) {
      console.log('Form invalid!');
      return;
    }

    let questionToUpdate = this.question;
    questionToUpdate.text = this.updateForm.value.text;
    questionToUpdate.required = this.updateForm.value.required;

    if (questionToUpdate.questionType === 'MULTIPLE_CHOICE') {
      this.processUpdateOfMultipleChoiceQuestion(questionToUpdate);
    } else if (questionToUpdate.questionType === 'RANKING') {
      this.processUpdateOfRankingQuestion(questionToUpdate);
    }

    this.survey.questionGroups[this.indexQuestionGroup].questions[indexQuestion] = questionToUpdate;
  }

  private processUpdateOfMultipleChoiceQuestion(questionToUpdate: Question) {
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

  private processUpdateOfRankingQuestion(questionToUpdate: Question) {
    let rankingGroupToUpdate = questionToUpdate.rankingGroup!;
    rankingGroupToUpdate.lowestRated = this.lowestRated?.value;
    rankingGroupToUpdate.highestRated = this.highestRated?.value;

    questionToUpdate.rankingGroup = rankingGroupToUpdate;
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

  checkIfFormValid() {
    return this.text?.errors ||
      (this.question.questionType === 'MULTIPLE_CHOICE' && this.checkIfCheckboxGroupFormValid()) ||
      (this.question.questionType === 'RANKING' && this.checkIfRatingGroupFormValid());
  }

  checkIfCheckboxGroupFormValid() {
    return this.minSelect?.errors || this.maxSelect?.errors ||
      this.updateForm.hasError('requiredButMinZeroCheckboxes') ||
      this.updateForm.hasError('maxSelectLessThanMinSelect');
  }

  checkIfRatingGroupFormValid() {
    return this.lowestRated?.errors || this.highestRated?.errors;
  }
}
