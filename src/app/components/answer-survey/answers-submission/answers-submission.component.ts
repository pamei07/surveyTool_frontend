import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormArray, FormGroup, FormGroupDirective} from "@angular/forms";
import {User} from "../../../model/user";
import {Answer} from "../../../model/answer";
import {Question} from "../../../model/question";
import {Checkbox} from "../../../model/checkbox";
import {UserService} from "../../../services/user/user.service";
import {AnswerService} from "../../../services/answer/answer.service";
import {Router} from "@angular/router";
import {Survey} from "../../../model/survey";
import {KeycloakService} from "keycloak-angular";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-answers-submission',
  templateUrl: 'answers-submission.component.html'
})

export class AnswersSubmissionComponent implements OnInit {

  @Input() survey!: Survey;
  @Output() backendErrorEventEmitter = new EventEmitter;
  user!: User;
  answerForm!: FormGroup;
  answerArray: Answer[] = [];

  get participantName() {
    return this.answerForm.get('participantName');
  }

  get questionGroupsFormArray() {
    return this.answerForm.get('questionGroupsFormArray') as FormArray;
  }

  constructor(private router: Router,
              private parentFormGroup: FormGroupDirective,
              private userService: UserService,
              private answerService: AnswerService,
              private keycloakService: KeycloakService) {
  }

  ngOnInit() {
    this.answerForm = this.parentFormGroup.control;
  }

  saveAnswersWithUser() {
    this.keycloakService.isLoggedIn().then(isLoggedIn => {
      if (isLoggedIn) {
        this.keycloakService.loadUserProfile().then(userProfile => {
          this.userService.findUserByEMail(userProfile.email).subscribe(
            (response: User) => {
              this.user = response;
              this.saveAnswers();
            }, (error: HttpErrorResponse) => {
              console.log(error);
              let user = this.userService.createUserFromKeycloakUserProfile(userProfile);
              this.userService.saveUser(user).subscribe(
                (response: User) => {
                  this.user = response;
                  this.saveAnswers();
                }
              );
            })
        })
      } else {
        this.saveAnswers();
      }
    })
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
  private saveAnswers() {
    this.questionGroupsFormArray.controls.forEach((answersToQuestionGroup, questionGroupIndex) => {
      answersToQuestionGroup.value.forEach((answerToQuestion: any, questionIndex: number) => {
        if (answerToQuestion instanceof Array) {
          answerToQuestion.forEach((checkbox: any, checkboxIndex: number) => {
            if (checkbox.checked == true) {
              this.pushAnswerToMultipleSelectQuestion(questionGroupIndex, questionIndex, checkbox, checkboxIndex);
            }
          })
        } else {
          if (answerToQuestion.checkboxId !== undefined && answerToQuestion.checkboxId !== '') {
            this.pushAnswerToSingleSelectQuestion(answerToQuestion, questionGroupIndex, questionIndex);
          } else if (answerToQuestion.confirmed !== undefined && answerToQuestion.confirmed === true) {
            this.pushAnswerToRankingQuestion(answerToQuestion, questionGroupIndex, questionIndex);
          } else if (typeof answerToQuestion === 'string' && answerToQuestion.trim() !== '') { // Skip text answers that only contain whitespace
            this.pushAnswerToTextQuestion(answerToQuestion, questionGroupIndex, questionIndex);
          }
        }
      })
    });
    console.log(this.answerArray);
    this.answerService.saveAnswers(this.answerArray).subscribe(
      () => {
        this.answerArray = [];
        this.router.navigate(["thanks"]);
      }, () => {
        this.backendError();
      });
  }

  private pushAnswerToMultipleSelectQuestion(questionGroupIndex: number,
                                             questionIndex: number,
                                             checkbox: any,
                                             checkboxIndex: number) {
    let answer = this.createAnswerWithUserInformation();

    if (checkbox.text !== '') {
      answer.setText(checkbox.text);
    }

    let currentQuestion: Question = this.survey
      .questionGroups[questionGroupIndex]
      .questions[questionIndex];
    answer.setQuestionId(currentQuestion.id);

    let currentCheckbox: Checkbox = this.survey
      .questionGroups[questionGroupIndex]
      .questions[questionIndex]
      .checkboxGroup!
      .checkboxes[checkboxIndex];
    answer.setCheckboxId(currentCheckbox.id);

    this.answerArray.push(answer);
  }

  private pushAnswerToSingleSelectQuestion(answerToQuestion: any,
                                           questionGroupIndex: number,
                                           questionIndex: number) {
    let answer = this.createAnswerWithUserInformation();

    if (answerToQuestion.text !== '') {
      answer.setText(answerToQuestion.text);
    }

    let currentQuestion: Question = this.survey
      .questionGroups[questionGroupIndex]
      .questions[questionIndex];
    answer.setQuestionId(currentQuestion.id);

    let currentCheckbox: Checkbox = this.survey
      .questionGroups[questionGroupIndex]
      .questions[questionIndex]
      .checkboxGroup!
      .checkboxes[answerToQuestion.checkboxId];
    answer.setCheckboxId(currentCheckbox.id);

    this.answerArray.push(answer);
  }

  private pushAnswerToRankingQuestion(answerToQuestion: any, questionGroupIndex: number, questionIndex: number) {
    let currentQuestion: Question = this.survey
      .questionGroups[questionGroupIndex]
      .questions[questionIndex];

    answerToQuestion.rankings.forEach((ranking: any) => {
      let answer = this.createAnswerWithUserInformation();
      answer.setQuestionId(currentQuestion.id);

      answer.setOptionId(ranking.optionId);
      answer.setRank(ranking.rank);
      this.answerArray.push(answer);
    })
  }

  private pushAnswerToTextQuestion(answerToQuestion: string,
                                   questionGroupIndex: number,
                                   questionIndex: number) {
    let answer = this.createAnswerWithUserInformation();

    answer.setText(answerToQuestion);

    let currentQuestion: Question = this.survey
      .questionGroups[questionGroupIndex]
      .questions[questionIndex];
    answer.setQuestionId(currentQuestion.id);

    this.answerArray.push(answer);
  }

  private createAnswerWithUserInformation() {
    let answer = new Answer();
    if (this.user !== undefined) {
      answer.setUserId(this.user.id);
    }

    let participantsName = this.participantName?.value;
    if (participantsName.trim() !== '') {
      answer.setParticipantName(participantsName);
    } else {
      answer.setParticipantName('Anonym');
    }
    return answer;
  }

  private backendError() {
    this.backendErrorEventEmitter.emit();
  }
}
