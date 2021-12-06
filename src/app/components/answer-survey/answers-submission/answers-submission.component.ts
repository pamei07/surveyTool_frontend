import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormArray, FormGroup, FormGroupDirective} from "@angular/forms";
import {User} from "../../../model/user";
import {HttpErrorResponse} from "@angular/common/http";
import {Answer} from "../../../model/answer";
import {Question} from "../../../model/question";
import {Checkbox} from "../../../model/checkbox";
import {UserService} from "../../../services/user/user.service";
import {AnswerService} from "../../../services/answer/answer.service";
import {Router} from "@angular/router";
import {Survey} from "../../../model/survey";

@Component({
  selector: 'app-answers-submission',
  templateUrl: 'answers-submission.component.html'
})

export class AnswersSubmissionComponent implements OnInit {

  @Input() survey!: Survey;
  @Output() backendErrorEventEmitter = new EventEmitter;
  answerForm!: FormGroup;
  answerArray: Answer[] = [];

  get userName() {
    return this.answerForm.get('userName');
  }

  get questionGroupsFormArray() {
    return this.answerForm.get('questionGroupsFormArray') as FormArray;
  }

  constructor(private router: Router,
              private parentFormGroup: FormGroupDirective,
              private userService: UserService,
              private answerService: AnswerService) {
  }

  ngOnInit() {
    this.answerForm = this.parentFormGroup.control;
  }

  postAnswersWithUser() {
    let userName = this.userName?.value;
    let user = this.userService.createUser(userName);
    this.userService.saveUser(user).subscribe(
      (response: User) => {
        this.postAnswers(response);
      }, (error: HttpErrorResponse) => {
        this.backendError();
      });
  }

  /**
   * Create Answer objects for each question on submit.
   * 1. For checkboxes with multipleSelect:
   *    --> Create an Answer object only if a checkbox has been checked
   * 2. For checkboxes without multipleSelect:
   *    --> Create an Answer object only if a checkbox-id is given
   * 3. For text questions:
   *    --> Create an Answer object only if a text field is not empty
   */
  private postAnswers(user: User) {
    this.questionGroupsFormArray.controls.forEach((answersToQuestionGroup, questionGroupIndex) => {
      answersToQuestionGroup.value.forEach((answerToQuestion: any, questionIndex: number) => {
        if (answerToQuestion instanceof Array) {
          answerToQuestion.forEach((checkbox: any, checkboxIndex: number) => {
            if (checkbox.checked == true) {
              this.pushAnswerToMultipleSelectQuestion(user, questionGroupIndex, questionIndex, checkbox, checkboxIndex);
            }
          })
        } else if (typeof answerToQuestion !== 'string') {
          if (answerToQuestion.checkboxId !== '') {
            this.pushAnswerToSingleSelectQuestion(user, answerToQuestion, questionGroupIndex, questionIndex);
          }
        } else if (answerToQuestion !== '') {
          this.pushAnswerToTextQuestion(user, answerToQuestion, questionGroupIndex, questionIndex);
        }
      })
    });
    console.log(this.answerArray);
    this.answerService.saveAnswers(this.answerArray).subscribe(
      () => {
        this.answerArray = [];
        this.router.navigate(["thanks"]);
      }, (error: HttpErrorResponse) => {
        this.backendError();
      });
  }

  private pushAnswerToMultipleSelectQuestion(user: User,
                                             questionGroupIndex: number,
                                             questionIndex: number,
                                             checkbox: any,
                                             checkboxIndex: number) {
    let answer = new Answer();
    answer.setUserId(user.id);

    if (checkbox.text !== '') {
      answer.setText(checkbox.text);
    }

    let currentQuestion: Question = this.survey
      .questionGroups![questionGroupIndex]
      .questions![questionIndex];
    answer.setQuestionId(currentQuestion.id);

    let currentCheckbox: Checkbox = this.survey
      .questionGroups![questionGroupIndex]
      .questions![questionIndex]
      .checkboxGroup!
      .checkboxes![checkboxIndex];
    answer.setCheckboxId(currentCheckbox.id);

    this.answerArray.push(answer);
  }

  private pushAnswerToSingleSelectQuestion(user: User,
                                           answerToQuestion: any,
                                           questionGroupIndex: number,
                                           questionIndex: number) {
    let answer = new Answer();
    answer.setUserId(user.id);

    if (answerToQuestion.text !== '') {
      answer.setText(answerToQuestion.text);
    }

    let currentQuestion: Question = this.survey
      .questionGroups![questionGroupIndex]
      .questions![questionIndex];
    answer.setQuestionId(currentQuestion.id);

    let currentCheckbox: Checkbox = this.survey
      .questionGroups![questionGroupIndex]
      .questions![questionIndex]
      .checkboxGroup!
      .checkboxes![answerToQuestion.checkboxId];
    answer.setCheckboxId(currentCheckbox.id);

    this.answerArray.push(answer);
  }

  private pushAnswerToTextQuestion(user: User,
                                   answerToQuestion: string,
                                   questionGroupIndex: number,
                                   questionIndex: number) {
    let answer = new Answer();
    answer.setUserId(user.id);
    answer.setText(answerToQuestion);

    let currentQuestion: Question = this.survey
      .questionGroups![questionGroupIndex]
      .questions![questionIndex];
    answer.setQuestionId(currentQuestion.id);

    this.answerArray.push(answer);
  }

  private backendError() {
    this.backendErrorEventEmitter.emit();
  }
}
