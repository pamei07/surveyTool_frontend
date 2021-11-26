import {Component, Input, OnInit} from '@angular/core';
import {Question} from "../../../../../model/question";
import {Answer} from "../../../../../model/answer";
import {AnswerService} from "../../../../../services/answer/answer.service";

@Component({
  selector: 'app-answers-text-question',
  templateUrl: 'answers-text-question.component.html'
})

export class AnswersTextQuestionComponent implements OnInit {
  @Input() question!: Question;
  @Input() questionIndex!: number;
  answers!: Answer[];
  numberOfUsersAnswering: number = 0;

  constructor(private answerService: AnswerService) {
  }

  ngOnInit() {
    this.answerService.getAnswersByQuestionId(this.question.id).subscribe(answers => {
      this.answers = answers;
      this.calculateNumberOfUsersAnswering(this.answers);
    });
  }

  private calculateNumberOfUsersAnswering(answers: Answer[]) {
    let userIds: number[] = [];
    for (let answer of answers) {
      let userId = <number>answer.userId;
      userIds.push(userId);
    }
    this.numberOfUsersAnswering = userIds.length;
  }
}
