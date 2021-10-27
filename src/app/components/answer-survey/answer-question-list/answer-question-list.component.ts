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

        this.answerArray.push(answer);
      }
    });
    console.log(this.answerArray);
    this.answerService.saveAnswers(this.answerArray).subscribe();
    this.answerArray = [];
  }
}
