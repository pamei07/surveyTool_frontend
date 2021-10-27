import {Component, Input, OnInit} from '@angular/core';
import {QuestionGroup} from "../../../model/question-group";
import {FormArray, FormBuilder} from "@angular/forms";
import {Answer} from "../../../model/answer";
import {Question} from "../../../model/question";

@Component({
  selector: 'answer-question-list',
  templateUrl: 'answer-question-list.component.html'
})

export class AnswerQuestionListComponent implements OnInit {

  @Input() questionGroup!: QuestionGroup;

  answerForm = this.fb.group({
    answers: this.fb.array([])
  });

  get answers() {
    return this.answerForm.get('answers') as FormArray;
  }

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.countPossibleAnswersForTextQuestions();
  }

  countPossibleAnswersForTextQuestions() {
    let counter = 0;

    this.questionGroup.questions!.forEach(question => {
      this.answers.push(this.fb.control(''));
      counter++;
    })
  }

  onSubmit() {
    let answer: Answer;
    let currentQuestion: Question = new Question();
    // TODO: Create answer with each value and post
    this.answers.controls.forEach((input, index) => {
      if (input.value !== '') {
        answer = new Answer();

        answer.setText(input.value);

        currentQuestion = this.questionGroup.questions![index]
        answer.setQuestion(currentQuestion);
        console.log(answer);
      }
    });
  }
}
