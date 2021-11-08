import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Question} from "../../../../model/question";
import {Answer} from "../../../../model/answer";
import {AnswerService} from "../../../../services/answer/answer.service";

@Component({
  selector: 'results-checkbox-question',
  templateUrl: 'results-checkbox-question.component.html'
})

export class ResultsCheckboxQuestionComponent implements OnInit {
  @Input() question!: Question;
  @Output() userIdsOfParticipants = new EventEmitter<number[]>();
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
    let userIds: number[] = [];
    for (let answer of answers) {
      let userId = <number>answer.user!.id;
      if (!userIds.includes(userId)) {
        userIds.push(userId);
      }
    }
    this.userIdsOfParticipants.emit(userIds);
    this.numberOfUsersAnswering = userIds.length;
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
}
