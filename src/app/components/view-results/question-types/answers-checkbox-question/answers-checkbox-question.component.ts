import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Question} from "../../../../model/question";
import {Answer} from "../../../../model/answer";
import {AnswerService} from "../../../../services/answer/answer.service";
import {User} from "../../../../model/user";

@Component({
  selector: 'answers-checkbox-question',
  templateUrl: 'answers-checkbox-question.component.html'
})

export class AnswersCheckboxQuestionComponent implements OnInit {
  @Input() question!: Question;
  @Output() participants = new EventEmitter<User[]>();
  answers!: Answer[];
  numberOfUsersAnswering: number = 0;
  percentagesForCheckboxes: number[] = [];
  votesForCheckboxes: number[] = [];
  checkboxesHaveTextAnswers: boolean = false;

  constructor(private answerService: AnswerService) {
  }

  ngOnInit() {
    this.answerService.getAnswersByQuestionId(this.question.id).subscribe(answers => {
      this.answers = answers;
      this.calculateNumberOfUsersAnswering(this.answers);
      if (this.question.hasCheckbox) {
        this.calculatePercentages();
        this.checkIfTextAnswersAvailable();
      }
    });
  }

  private calculateNumberOfUsersAnswering(answers: Answer[]) {
    let users: User[] = [];
    for (let answer of answers) {
      let userPostingAnswer = <User>answer.user;
      if (!users.some(user => user.id === userPostingAnswer.id)) {
        users.push(userPostingAnswer);
      }
    }
    this.participants.emit(users);
    this.numberOfUsersAnswering = users.length;
  }


  private calculatePercentages() {
    this.question.checkboxGroup!.checkboxes!.forEach((checkbox, index) => {
      let numberOfAnswersForCheckbox = 0;
      this.answers.forEach(answer => {
        if (answer.checkbox!.id === checkbox.id) {
          numberOfAnswersForCheckbox++;
        }
      })
      this.votesForCheckboxes.push(numberOfAnswersForCheckbox);
      this.percentagesForCheckboxes.push(numberOfAnswersForCheckbox / this.numberOfUsersAnswering);
    })
  }

  private checkIfTextAnswersAvailable() {
    if (this.answers.some((answer) => answer.text !== null)) {
      this.checkboxesHaveTextAnswers = true;
    }
  }

  checkboxIsMostVoted(checkboxIndex: number) {
    return (this.votesForCheckboxes[checkboxIndex] == Math.max.apply(null, this.votesForCheckboxes));
  }
}
