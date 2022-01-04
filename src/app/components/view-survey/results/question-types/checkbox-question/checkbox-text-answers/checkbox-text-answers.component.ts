import {Component, Input, OnInit} from '@angular/core';
import {Answer} from "../../../../../../model/answer";
import {Checkbox} from "../../../../../../model/checkbox";

@Component({
  selector: 'app-checkbox-text-answers',
  templateUrl: 'checkbox-text-answers.component.html'
})

export class CheckboxTextAnswersComponent implements OnInit {

  @Input() answers!: Answer[];
  @Input() checkbox!: Checkbox;
  relevantAnswers: Answer[] = [];

  ngOnInit() {
    this.answers.forEach((answer: Answer) => {
      if (answer.checkboxId === this.checkbox.id) {
        this.relevantAnswers.push(answer);
      }
    })
  }

}
