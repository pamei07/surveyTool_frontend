import {Component, Input, OnInit} from '@angular/core';
import {Question} from "../../../../../model/question";
import {Answer} from "../../../../../model/answer";
import {AnswerService} from "../../../../../services/answer/answer.service";

@Component({
  selector: 'app-answers-checkbox-question',
  templateUrl: 'answers-checkbox-question.component.html'
})

export class AnswersCheckboxQuestionComponent implements OnInit {
  @Input() question!: Question;
  answers!: Answer[];
  numberOfUsersAnswering: number = 0;
  votesForCheckboxes: number[] = [];
  showTable: boolean = true;

  constructor(private answerService: AnswerService) {
  }

  ngOnInit() {
    this.answerService.getAnswersByQuestionId(this.question.id).subscribe(answers => {
      this.answers = answers;
      this.calculateNumberOfUsersAnswering(this.answers);
      this.countVotesForCheckboxes();
    });
  }

  private countVotesForCheckboxes() {
    this.question.checkboxGroup!.checkboxes!.forEach((checkbox) => {
      let numberOfAnswersForCheckbox = 0;
      this.answers.forEach(answer => {
        if (answer.checkboxID === checkbox.id) {
          numberOfAnswersForCheckbox++;
        }
      })
      this.votesForCheckboxes.push(numberOfAnswersForCheckbox);
    })
  }

  private calculateNumberOfUsersAnswering(answers: Answer[]) {
    let userIDs: number[] = [];
    for (let answer of answers) {
      let userIdPostingAnswer = <number>answer.userID;
      if (!userIDs.some(userID => userID === userIdPostingAnswer)) {
        userIDs.push(userIdPostingAnswer);
      }
    }
    this.numberOfUsersAnswering = userIDs.length;
  }

  setShowTable(bool: boolean) {
    this.showTable = bool;
  }
}
