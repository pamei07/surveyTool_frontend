import {Component, Input, OnInit} from '@angular/core';
import {Question} from "../../../../../../model/question";
import {Answer} from "../../../../../../model/answer";
import {AnswerService} from "../../../../../../services/answer/answer.service";

@Component({
  selector: 'app-answers-checkbox-question',
  templateUrl: 'answers-checkbox-question.component.html'
})

export class AnswersCheckboxQuestionComponent implements OnInit {
  @Input() question!: Question;
  @Input() questionIndex!: number;
  answers!: Answer[];
  numberOfUsersAnswering: number = 0;
  votesForCheckboxes: number[] = [];
  showTable: boolean = true;

  constructor(private answerService: AnswerService) {
  }

  ngOnInit() {
    this.answerService.findAnswersByQuestionId(this.question.id).subscribe(answers => {
      this.answers = answers;
      this.calculateNumberOfUsersAnswering(this.answers);
      this.countVotesForCheckboxes();
    });
  }

  private countVotesForCheckboxes() {
    this.question.checkboxGroup!.checkboxes!.forEach((checkbox) => {
      let numberOfAnswersForCheckbox = 0;
      this.answers.forEach(answer => {
        if (answer.checkboxId === checkbox.id) {
          numberOfAnswersForCheckbox++;
        }
      })
      this.votesForCheckboxes.push(numberOfAnswersForCheckbox);
    })
  }

  private calculateNumberOfUsersAnswering(answers: Answer[]) {
    let participantIds: (string | undefined)[] = [];
    for (let answer of answers) {
      let participantIdPostingAnswer = answer.participantId;
      if (!participantIds.some(participantId => participantId === participantIdPostingAnswer)) {
        participantIds.push(participantIdPostingAnswer);
      }
    }
    this.numberOfUsersAnswering = participantIds.length;
  }

  setShowTable(bool: boolean) {
    this.showTable = bool;
  }
}
