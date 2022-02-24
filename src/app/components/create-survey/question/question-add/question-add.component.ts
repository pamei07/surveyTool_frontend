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
import {QuestionType} from "../../../../model/question-type";
import {RankingGroup} from "../../../../model/ranking-group";

@Component({
  selector: 'app-question-add',
  templateUrl: 'question-add.component.html'
})

export class QuestionAddComponent {

  @Input() survey!: Survey;
  @Input() indexQuestionGroup!: number;
  selectedQuestionType: string = 'Fragetyp auswählen...';
  questionTypes: Map<string, string> = new Map<string, string>([
    ['---', ''],
    ['Freitext', 'TEXT'],
    ['Auswahl (Multiple Choice)', 'MULTIPLE_CHOICE'],
    ['Ranking', 'RANKING']
  ])

  questionForm = this.fb.group({
    text: ['', [Validators.required, Validators.maxLength(500), stringNotEmpty()]],
    required: false,
    checkboxGroup: this.fb.group({
      multipleSelect: false,
      minSelect: [{value: '0', disabled: true}, [Validators.required, Validators.min(0)]],
      maxSelect: [{value: '2', disabled: true}, [Validators.required, Validators.min(2)]]
    }),
    rankingGroup: this.fb.group({
      leastRated_label: ['', [Validators.required, Validators.maxLength(500), stringNotEmpty()]],
      highestRated_label: ['', [Validators.required, Validators.maxLength(500), stringNotEmpty()]]
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

  get leastRated_label() {
    return this.questionForm.get('rankingGroup')?.get('leastRated_label');
  }

  get highestRated_label() {
    return this.questionForm.get('rankingGroup')?.get('highestRated_label');
  }

  constructor(private fb: FormBuilder) {
  }

  addNewQuestion() {
    if (this.checkIfFormValid()) {
      console.log('Form invalid!');
      return;
    }

    let question = new Question();
    question.text = this.questionForm.value.text;
    question.required = this.questionForm.value.required;
    if (this.selectedQuestionType === 'MULTIPLE_CHOICE') {
      this.processMultipleChoiceQuestion(question);
    } else if (this.selectedQuestionType === 'RANKING') {
      this.processRankingQuestion(question);
    } else {
      question.questionType = QuestionType.TEXT;
    }

    this.survey.questionGroups![this.indexQuestionGroup].questions!.push(question);

    // If minSelect/maxSelect of checkboxGroup have been enabled => disable them
    if (this.minSelect?.enabled && this.maxSelect?.enabled) {
      this.enableDisableMinMaxInput();
    }

    // Reset to initial values so that unchecked checkboxes do not result in null
    this.questionForm.reset(this.initialFormValues);
    this.questionForm.patchValue({checkboxGroup: {minSelect: 0, maxSelect: 2}});
  }

  private processMultipleChoiceQuestion(question: Question) {
    question.questionType = QuestionType.MULTIPLE_CHOICE;

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

  private processRankingQuestion(question: Question) {
    question.questionType = QuestionType.RANKING;

    let rankingGroup = new RankingGroup();
    rankingGroup.leastRated_label = this.leastRated_label?.value;
    rankingGroup.highestRated_label = this.highestRated_label?.value;

    question.rankingGroup = rankingGroup;
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
    return this.text?.errors || this.selectedQuestionType === '' ||
      (this.selectedQuestionType === 'MULTIPLE_CHOICE' && this.checkIfCheckboxGroupFormValid()) ||
      (this.selectedQuestionType === 'RANKING' && this.checkIfRatingGroupFormValid());
  }

  checkIfCheckboxGroupFormValid() {
    return this.minSelect?.errors || this.maxSelect?.errors ||
      this.questionForm.hasError('requiredButMinZeroCheckboxes') ||
      this.questionForm.hasError('maxSelectLessThanMinSelect');
  }

  checkIfRatingGroupFormValid() {
    return this.leastRated_label?.errors || this.highestRated_label?.errors;
  }
}
