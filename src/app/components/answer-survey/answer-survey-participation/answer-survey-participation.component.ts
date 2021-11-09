import {Component, Input, OnInit} from '@angular/core';
import {Survey} from "../../../model/survey";
import {Router} from "@angular/router";
import {Answer} from "../../../model/answer";
import {FormArray, FormBuilder, Validators} from "@angular/forms";
import {AnswerService} from "../../../services/answer/answer.service";
import {Question} from "../../../model/question";
import {Checkbox} from "../../../model/checkbox";
import {User} from "../../../model/user";
import {UserService} from "../../../services/user/user.service";
import {noOfCheckboxesCheckedInMinMaxRange} from "../../../directives/min-max-select-validation.directive";

@Component({
  selector: 'answer-survey-participation',
  templateUrl: 'answer-survey-participation.component.html'
})

export class AnswerSurveyParticipationComponent implements OnInit {

  @Input() survey!: Survey;
  answerArray: Answer[] = [];

  answerForm = this.fb.group({
    userName: [''],
    questionGroupsFormArray: this.fb.array([])
  });

  get userName() {
    return this.answerForm.get('userName');
  }

  get questionGroupsFormArray() {
    return this.answerForm.get('questionGroupsFormArray') as FormArray;
  }

  constructor(private router: Router,
              private fb: FormBuilder,
              private userService: UserService,
              private answerService: AnswerService) {
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
   *    There are 2 types of form fields:
   *    1. For questions with checkboxes:
   *       --> another FormArray containing FormGroups with an attribute 'checked' to mark if a checkbox has been checked
   *           and a 'text' attribute to capture the text input if available
   *    2. For plain text questions:
   *       --> a FormControl capturing the text input
   */
  insertInputFields() {
    this.survey.questionGroups!.forEach((questionGroup, questionGroupIndex) => {

      this.questionGroupsFormArray.push(this.fb.array([]));
      let questionsFormArray = this.questionGroupsFormArray.at(questionGroupIndex) as FormArray;

      questionGroup.questions!.forEach((question, questionIndex) => {

        if (question.hasCheckbox) {
          if (question.checkboxGroup!.multipleSelect) {
            questionsFormArray
              .push(this.fb.array([], [noOfCheckboxesCheckedInMinMaxRange(question)]));
            let checkboxesFormArray = questionsFormArray.at(questionIndex) as FormArray;

            question.checkboxGroup?.checkboxes?.forEach(checkbox => {
              checkboxesFormArray.push(this.fb.group({
                checked: false,
                text: [{value: '', disabled: true}, [Validators.required]]
              }))
            })

            questionsFormArray.setControl(questionIndex, checkboxesFormArray);
          } else {
            if (question.required) {
              questionsFormArray.push(this.fb.group({
                checkboxId: ['', [Validators.required]],
                text: [{value: '', disabled: true}, [Validators.required]]
              }))
            } else {
              questionsFormArray.push(this.fb.group({
                checkboxId: [''],
                text: [{value: '', disabled: true}, [Validators.required]]
              }))
            }
          }
        } else {
          if (question.required) {
            questionsFormArray.push(this.fb.control('', [Validators.required]));
          } else {
            questionsFormArray.push(this.fb.control(''));
          }
        }
      })
    })
  }

  postAnswersWithUser() {
    this.postUser().subscribe(savedUser => {
      this.postAnswers(savedUser);
    });
  }

  private postUser() {
    let user: User = new User();
    let userNameInput = this.userName!.value;
    if (userNameInput !== '') {
      user.setName(userNameInput);
    } else {
      user.setName('Anonym');
    }
    return this.userService.saveUser(user);
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
    let answer: Answer;
    let currentQuestion: Question = new Question();
    let currentCheckbox: Checkbox = new Checkbox();
    this.questionGroupsFormArray.controls.forEach((answersToQuestionGroup, questionGroupIndex) => {
      answersToQuestionGroup.value.forEach((answerToQuestion: any, questionIndex: number) => {
        if (answerToQuestion instanceof Array) {
          answerToQuestion.forEach((checkbox: any, checkboxIndex: number) => {
            if (checkbox.checked == true) {
              answer = new Answer();
              answer.setUser(user);

              if (checkbox.text !== '') {
                answer.setText(checkbox.text);
              }

              currentQuestion = this.survey.questionGroups![questionGroupIndex].questions![questionIndex]
              answer.setQuestion(currentQuestion);

              currentCheckbox = this.survey.questionGroups![questionGroupIndex].questions![questionIndex].checkboxGroup!.checkboxes![checkboxIndex];
              answer.setCheckbox(currentCheckbox);

              this.answerArray.push(answer)
            }
          })
        } else if (typeof answerToQuestion !== 'string') {
          if (answerToQuestion.checkboxId !== '') {
            answer = new Answer();
            answer.setUser(user);

            if (answerToQuestion.text !== '') {
              answer.setText(answerToQuestion.text);
            }
            currentQuestion = this.survey.questionGroups![questionGroupIndex].questions![questionIndex]
            answer.setQuestion(currentQuestion);

            currentCheckbox = this.survey
              .questionGroups![questionGroupIndex]
              .questions![questionIndex]
              .checkboxGroup!
              .checkboxes![answerToQuestion.checkboxId];
            answer.setCheckbox(currentCheckbox);

            this.answerArray.push(answer);
          }
        } else if (answerToQuestion !== '') {
          answer = new Answer();
          answer.setUser(user);

          answer.setText(answerToQuestion);

          currentQuestion = this.survey.questionGroups![questionGroupIndex].questions![questionIndex];
          answer.setQuestion(currentQuestion);

          this.answerArray.push(answer);
        }
      })
    });
    console.log(this.answerArray);
    this.answerService.saveAnswers(this.answerArray).subscribe(() => {
      this.answerArray = [];
      this.router.navigate(["thanks"])
    });
  }
}
