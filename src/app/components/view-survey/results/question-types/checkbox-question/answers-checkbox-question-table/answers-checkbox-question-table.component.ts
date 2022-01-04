import {Component, Input, OnInit} from '@angular/core';
import {Question} from "../../../../../../model/question";
import {Answer} from "../../../../../../model/answer";

@Component({
  selector: 'app-answers-checkbox-question-table',
  templateUrl: 'answers-checkbox-question-table.component.html'
})

export class AnswersCheckboxQuestionTableComponent implements OnInit {
  @Input() question!: Question;
  @Input() answers!: Answer[];
  @Input() numberOfUsersAnswering!: number;
  @Input() votesForCheckboxes!: number[];
  percentagesForCheckboxes: number[] = [];
  checkboxesHaveTextAnswers: boolean = false;

  ngOnInit() {
    this.calculatePercentages();
    this.checkIfTextAnswersAvailable();
  }

  private calculatePercentages() {
    this.votesForCheckboxes.forEach((votes) => {
      if (this.numberOfUsersAnswering > 0) {
        this.percentagesForCheckboxes.push(votes / this.numberOfUsersAnswering);
      } else {
        this.percentagesForCheckboxes.push(0);
      }
    })
  }

  private checkIfTextAnswersAvailable() {
    if (this.answers.some((answer) => answer.text !== null)) {
      this.checkboxesHaveTextAnswers = true;
    }
  }

  checkboxIsMostVoted(checkboxIndex: number) {
    return (this.votesForCheckboxes[checkboxIndex] == Math.max.apply(null, this.votesForCheckboxes)) &&
      (this.votesForCheckboxes[checkboxIndex] !== 0);
  }
}
