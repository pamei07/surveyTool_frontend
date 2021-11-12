import {Component, Input, OnInit} from '@angular/core';
import {Question} from "../../../../../model/question";
import {Answer} from "../../../../../model/answer";
import {AnswerService} from "../../../../../services/answer/answer.service";
import {User} from "../../../../../model/user";

@Component({
  selector: 'answers-text-question',
  templateUrl: 'answers-text-question.component.html'
})

export class AnswersTextQuestionComponent implements OnInit {
  @Input() question!: Question;
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
    let users: User[] = [];
    for (let answer of answers) {
      let user = <User>answer.user;
      users.push(user);
    }
    this.numberOfUsersAnswering = users.length;
  }
}
