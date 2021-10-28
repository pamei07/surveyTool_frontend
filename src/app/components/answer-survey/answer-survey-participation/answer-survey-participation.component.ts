import {Component, OnInit} from '@angular/core';
import {Survey} from "../../../model/survey";
import {ActivatedRoute} from "@angular/router";
import {Answer} from "../../../model/answer";
import {FormArray, FormBuilder} from "@angular/forms";
import {AnswerService} from "../../../services/answer/answer.service";
import {Question} from "../../../model/question";
import {Checkbox} from "../../../model/checkbox";

@Component({
  selector: 'answer-survey-participation',
  templateUrl: 'answer-survey-participation.component.html'
})

export class AnswerSurveyParticipationComponent implements OnInit {

  survey!: Survey;
  uuid: string | null;
  answerArray: Answer[] = [];

  answerForm = this.fb.group({
    questionGroupsAnswers: this.fb.array([])
  });

  get questionGroupsAnswers() {
    return this.answerForm.get('questionGroupsAnswers') as FormArray;
  }

  constructor(private activatedRoute: ActivatedRoute,
              private fb: FormBuilder,
              private answerService: AnswerService) {
    this.uuid = activatedRoute.snapshot.queryParamMap.get('surveyUUID');
    this.survey = JSON.parse(<string>sessionStorage.getItem('survey' + this.uuid));
  }

  ngOnInit() {
    this.insertInputFields();
  }

  /**
   * Push an answer form for each question into the FormArray 'answers'
   * There are 2 types of answer forms:
   * 1. For questions with checkboxes:
   *    --> another FormArray containing FormGroups with an attribute 'checked' to mark if a checkbox has been checked
   *        and a 'text' attribute to capture the text input if available
   * 2. For plain text questions:
   *    --> a FormControl capturing the text input
   */
  insertInputFields() {
    this.survey.questionGroups!.forEach((questionGroup, questionGroupIndex) => {

      this.questionGroupsAnswers.push(this.fb.array([]));

      let questionGroupAnswerFormArray = this.questionGroupsAnswers.at(questionGroupIndex) as FormArray;

      questionGroup.questions!.forEach((question, questionIndex) => {
        if (question.hasCheckbox) {
          questionGroupAnswerFormArray.push(this.fb.array([]));
          let checkboxFormArray = questionGroupAnswerFormArray.at(questionIndex) as FormArray;

          question.checkboxGroup?.checkboxes?.forEach(checkbox => {
            checkboxFormArray.push(this.fb.group({
              checked: false,
              text: ''
            }))
          })

          questionGroupAnswerFormArray.setControl(questionIndex, checkboxFormArray);
        } else {
          questionGroupAnswerFormArray.push(this.fb.control(''));
        }

      })

    })
  }

  /**
   * Create Answer objects for each question on submit.
   * 1. For checkboxes:
   *    --> Create an Answer object only if a checkbox has been checked
   * 2. For text questions:
   *    --> Create an Answer object only if a text field is not empty
   */
  onSubmit() {
    console.log(this.answerForm);
    let answer: Answer;
    let currentQuestion: Question = new Question();
    let currentCheckbox: Checkbox = new Checkbox();
    this.questionGroupsAnswers.controls.forEach((questionGroupAnswers, questionGroupIndex) => {
      questionGroupAnswers.value.forEach((questionAnswer: any, questionIndex: number) => {
        if (questionAnswer instanceof Array) {
          questionAnswer.forEach((checkbox: any, checkboxIndex: number) => {
            if (checkbox.checked == true || checkbox.checked == 'true') {
              answer = new Answer();

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
        } else if (questionAnswer !== '') {
          answer = new Answer();

          answer.setText(questionAnswer);

          currentQuestion = this.survey.questionGroups![questionGroupIndex].questions![questionIndex];
          answer.setQuestion(currentQuestion);

          this.answerArray.push(answer);
        }
      })
    });
    console.log(this.answerArray);
    this.answerService.saveAnswers(this.answerArray).subscribe();
    this.answerArray = [];
  }
}
