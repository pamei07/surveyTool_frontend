import {Component, Input, OnInit} from '@angular/core';
import {QuestionGroup} from "../../../model/question-group";
import {FormArray, FormBuilder} from "@angular/forms";
import {Answer} from "../../../model/answer";
import {Question} from "../../../model/question";
import {AnswerService} from "../../../services/answer/answer.service";

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

  insertInputFields() {
    this.questionGroup.questions!.forEach((question, index) => {
      if (question.hasCheckbox) {
        this.answers.push(this.fb.array([]));
        let checkboxFormArray = this.answers.at(index) as FormArray;
        question.checkboxGroup?.checkboxes?.forEach(checkbox => {
          checkboxFormArray.push(this.fb.group({
            checked: '',
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

  onSubmit() {
    let answer: Answer;
    let currentQuestion: Question = new Question();
    // TODO: Create Answer object for checkboxes
    this.answers.controls.forEach((input, index) => {
      if (input.value !== '' && !(input.value instanceof Array)) {
        answer = new Answer();

        answer.setText(input.value);

        currentQuestion = this.questionGroup.questions![index]
        answer.setQuestion(currentQuestion);

        this.answerArray.push(answer);
      }
    });
    console.log(this.answerArray);
    this.answerService.saveAnswers(this.answerArray).subscribe();
    this.answerArray = [];
  }
}
