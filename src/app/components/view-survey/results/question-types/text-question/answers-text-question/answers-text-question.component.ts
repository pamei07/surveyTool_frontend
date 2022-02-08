import {Component, Input, OnInit} from '@angular/core';
import {Question} from "../../../../../../model/question";
import {Answer} from "../../../../../../model/answer";
import {AnswerService} from "../../../../../../services/answer/answer.service";

@Component({
  selector: 'app-answers-text-question',
  templateUrl: 'answers-text-question.component.html'
})

export class AnswersTextQuestionComponent implements OnInit {
  @Input() question!: Question;
  @Input() questionIndex!: number;
  answers!: Answer[];
  numberOfUsersAnswering: number = 0;
  collapsedAnswers: boolean = true;

  constructor(private answerService: AnswerService) {
  }

  ngOnInit() {
    this.answerService.findAnswersByQuestionId(this.question.id).subscribe(answers => {
      this.answers = answers;
      this.calculateNumberOfUsersAnswering(this.answers);
    });
  }

  private calculateNumberOfUsersAnswering(answers: Answer[]) {
    let participantIds: (string | undefined)[] = [];
    for (let answer of answers) {
      let participantId = answer.participantId;
      participantIds.push(participantId);
    }
    this.numberOfUsersAnswering = participantIds.length;
  }

  collapseTextAnswers() {
    let relevantAnswers = 'question' + this.question.id;
    if (this.collapsedAnswers) {
      Array.from(document.getElementsByClassName('collapsableAnswer ' + relevantAnswers)).forEach((answer) => {
        answer.classList.add('show');
      });
    } else {
      Array.from(document.getElementsByClassName('collapsableAnswer ' + relevantAnswers)).forEach((answer) => {
        answer.classList.remove('show');
        let element = document.getElementById('question' + this.question.id);
        element?.scrollIntoView();
      });
    }
    this.collapsedAnswers = !this.collapsedAnswers;
  }
}
