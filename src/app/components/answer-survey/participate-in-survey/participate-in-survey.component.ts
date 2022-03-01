import {Component, Input, OnInit} from '@angular/core';
import {Survey} from "../../../model/survey";
import {Router} from "@angular/router";
import {FormArray, FormBuilder, Validators} from "@angular/forms";
import {Question} from "../../../model/question";
import {noOfCheckboxesCheckedInMinMaxRange} from "../../../directives/min-max-select-validation.directive";
import {stringNotEmpty} from "../../../directives/string-validation.directive";
import {rankingConfirmedDoneIfRequired} from "../../../directives/ranking-validation.directive";

@Component({
  selector: 'app-participate-in-survey',
  templateUrl: 'participate-in-survey.component.html'
})

export class ParticipateInSurveyComponent implements OnInit {

  @Input() survey!: Survey;
  backendError: boolean = false;
  backendErrorMessage: string = "Beim Senden Ihrer Antworten ist etwas schiefgelaufen.\n" +
    " Bitte überpüfen Sie Ihre Angaben und versuchen Sie es erneut.";

  answerForm = this.fb.group({
    participantName: ['', [Validators.maxLength(255)]],
    questionGroupsFormArray: this.fb.array([])
  });

  get questionGroupsFormArray() {
    return this.answerForm.get('questionGroupsFormArray') as FormArray;
  }

  get questionGroups() {
    return this.survey.questionGroups;
  }

  constructor(private router: Router,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    if (this.survey.questionGroups !== null) {
      this.insertInputFields();
    }
    console.log(this.answerForm);
  }

  /**
   * Structure of answerForm - example:
   *  answerForm = FormGroup:
   *                - userName
   *                - questionGroupsFormArray (FormArray - Containing a FormArray for each questionGroup):
   *                    0: FormArray (First questionGroup - Array containing the form fields for each question)
   *                       0: FormControl (if text question)
   *                       1: FormArray (if question with checkboxes and multipleSelect - Array containing FormGroups for each checkbox)
   *                           0: FormGroup (First checkbox)
   *                               - 'checked'
   *                               - 'text
   *                           1: FormGroup (Second checkbox)
   *                               - 'checked'
   *                               - 'text
   *                           ...
   *                           X: FormGroup (Xth checkbox)
   *                               - 'checked'
   *                               - 'text
   *                       2: FormGroup (if question with checkboxes but not multipleSelect)
   *                           - 'checkboxId'
   *                           - 'text'
   *                       3: FormGroup (if rankingquestion)
   *                           - 'confirmed'
   *                           - 'rankings' (FormArray)
   *                               0: FormGroup (First option)
   *                                   - 'optionId'
   *                                   - 'rank'
   *                               1: FormGroup (Second option)
   *                                   - 'optionId'
   *                                   - 'rank'
   *                               ...
   *                               X: FormGroup (Xth option)
   *                                   - 'optionId'
   *                                   - 'rank'
   *                       ...
   *                       m: FormControl/FormGroup/FormArray
   *                    1: FormArray (Second questionGroup)
   *                       0: FormControl/FormGroup/FormArray
   *                       1: FormControl/FormGroup/FormArray
   *                       ...
   *                       n: FormControl/FormGroup/FormArray
   *                    ...
   *                    Z: FormArray (Zth questionGroup)
   *
   * insertInputFields():
   *    Push a FormArray for each questionGroup into the FormArray 'questionGroupsFormArray'.
   *    Each FormArray contains the form fields for each question in the questionGroup.
   *    There are 3 types of form fields:
   *    1. For questions with checkboxes (multipleSelect):
   *       --> another FormArray containing FormGroups with an attribute 'checked' to mark if a checkbox has been checked
   *           and a 'text' attribute to capture the text input if available
   *    2. For questions with checkboxes (singleSelect):
   *       --> a FormGroup containing the checkboxId of the checkbox checked and a text if submitted
   *    3. For plain text questions:
   *       --> a FormControl capturing the text input
   *    4. For ranking questions:
   *       --> a FormGroup containing an attribute named 'confirmed' to show if a ranking question has been actually answered
   *           and not just skipped + a FormArray 'ranking' containing a FormGroup for each option in the ranking question.
   *           Each of those FormGroups contain 2 attributes: 'optionId', 'rank' to assign the position of an option in the ranking
   */
  insertInputFields() {
    if (this.questionGroups === undefined) {
      return;
    }

    this.questionGroups.forEach((questionGroup, questionGroupIndex) => {

      this.questionGroupsFormArray.push(this.fb.array([]));
      let questionsFormArray = this.questionGroupsFormArray.at(questionGroupIndex) as FormArray;

      questionGroup.questions.forEach((question, questionIndex) => {
        this.addQuestionToForm(question, questionIndex, questionsFormArray);
      })
    })
  }

  private addQuestionToForm(question: Question, questionIndex: number, questionsFormArray: FormArray) {
    if (question.questionType === 'MULTIPLE_CHOICE') {
      if (question.checkboxGroup!.multipleSelect) {
        this.addMultipleSelectQuestion(question, questionIndex, questionsFormArray);
      } else {
        this.addSingleSelectQuestion(question, questionsFormArray);
      }
    } else if (question.questionType === 'RANKING') {
      this.addRankingQuestion(question, questionIndex, questionsFormArray);
    } else {
      this.addTextQuestion(question, questionsFormArray);
    }
  }

  private addMultipleSelectQuestion(question: Question, questionIndex: number, questionsFormArray: FormArray) {
    questionsFormArray.push(this.fb.array([], [noOfCheckboxesCheckedInMinMaxRange(question)]));
    let checkboxesFormArray = questionsFormArray.at(questionIndex) as FormArray;

    question.checkboxGroup?.checkboxes?.forEach(() => {
      checkboxesFormArray.push(this.fb.group({
        checked: false,
        text: [{value: '', disabled: true}, [Validators.required, Validators.maxLength(1500), stringNotEmpty()]]
      }))
    })
  }

  private addSingleSelectQuestion(question: Question, questionsFormArray: FormArray) {
    if (question.required) {
      questionsFormArray.push(this.fb.group({
        checkboxId: ['', [Validators.required]],
        text: [{value: '', disabled: true}, [Validators.required, Validators.maxLength(1500), stringNotEmpty()]]
      }))
    } else {
      questionsFormArray.push(this.fb.group({
        checkboxId: [''],
        text: [{value: '', disabled: true}, [Validators.required, Validators.maxLength(1500), stringNotEmpty()]]
      }))
    }
  }

  private addRankingQuestion(question: Question, questionIndex: number, questionsFormArray: FormArray) {
    questionsFormArray.push(this.fb.group({
      confirmed: false,
      rankings: this.fb.array([])
    }, {validators: [rankingConfirmedDoneIfRequired(question)]}))

    let rankingOptionsFormArray = questionsFormArray.at(questionIndex).get('rankings') as FormArray;

    question.rankingGroup?.options.forEach((option, index) => {
      rankingOptionsFormArray.push(this.fb.group({
        optionId: option.id,
        rank: index + 1
      }))
    })
  }

  private addTextQuestion(question: Question, questionsFormArray: FormArray) {
    if (question.required) {
      questionsFormArray.push(this.fb.control('', [Validators.required, Validators.maxLength(1500), stringNotEmpty()]));
    } else {
      questionsFormArray.push(this.fb.control('', [Validators.maxLength(1500)]));
    }
  }

  setBackendError() {
    this.backendError = true;
  }
}
