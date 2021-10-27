import {Component, Input, OnInit} from '@angular/core';
import {QuestionGroup} from "../../../model/question-group";
import {FormArray, FormBuilder} from "@angular/forms";
import {Answer} from "../../../model/answer";
import {Question} from "../../../model/question";
import {AnswerService} from "../../../services/answer/answer.service";
import {Checkbox} from "../../../model/checkbox";

@Component({
  selector: 'answer-question-list',
  templateUrl: 'answer-question-list.component.html'
})

export class AnswerQuestionListComponent implements OnInit {

  @Input() questionGroup!: QuestionGroup;
  answerArray: Answer[] = [];

  answerForm = this.fb.group({
    answers: this.fb.array([])
  });

  get answers() {
    return this.answerForm.get('answers') as FormArray;
  }

  constructor(private fb: FormBuilder,
              private answerService: AnswerService) {
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
    this.questionGroup.questions!.forEach((question, index) => {
      if (question.hasCheckbox) {
        this.answers.push(this.fb.array([]));
        let checkboxFormArray = this.answers.at(index) as FormArray;
        question.checkboxGroup?.checkboxes?.forEach(checkbox => {
          checkboxFormArray.push(this.fb.group({
            checked: false,
            text: ''
          }))
        })
        this.answers.setControl(index, checkboxFormArray);
      } else {
        this.answers.push(this.fb.control(''));
      }
    })
    console.log(this.answerForm);
  }

  /**
   * Create Answer objects for each question on submit.
   * 1. For checkboxes:
   *    --> Create an Answer object only if a checkbox has been checked
   * 2. For text questions:
   *    --> Create an Answer object only if a text field is not empty
   */
  onSubmit() {
    console.log(this.answerForm)
    let answer: Answer;
    let currentQuestion: Question = new Question();
    let currentCheckbox: Checkbox = new Checkbox();
    this.answers.controls.forEach((input, questionIndex) => {
      if (input.value instanceof Array) {
        input.value.forEach((checkbox, checkboxIndex) => {
          if (checkbox.checked == true || checkbox.checked == 'true') {
            answer = new Answer();

            if (checkbox.text !== '') {
              answer.setText(checkbox.text);
            }

            currentQuestion = this.questionGroup.questions![questionIndex]
            answer.setQuestion(currentQuestion);

            currentCheckbox = this.questionGroup.questions![questionIndex].checkboxGroup!.checkboxes![checkboxIndex];
            answer.setCheckbox(currentCheckbox);

            this.answerArray.push(answer)
          }
        })
      } else if (input.value !== '') {
        answer = new Answer();

        answer.setText(input.value);

        currentQuestion = this.questionGroup.questions![questionIndex]
        answer.setQuestion(currentQuestion);

        this.answerArray.push(answer);
      }
    });
    console.log(this.answerArray);
    this.answerService.saveAnswers(this.answerArray).subscribe();
    this.answerArray = [];
  }
}
