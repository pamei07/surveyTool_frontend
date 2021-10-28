import {Component, OnInit} from '@angular/core';
import {Survey} from "../../../model/survey";
import {ActivatedRoute} from "@angular/router";
import {Answer} from "../../../model/answer";
import {FormArray, FormBuilder} from "@angular/forms";
import {AnswerService} from "../../../services/answer/answer.service";

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
    console.log(this.answerForm)
  }

  onSubmit() {
    console.log('test');
  }
}
