import {Component, Input} from '@angular/core';
import {Answer} from "../../../../../model/answer";
import {Checkbox} from "../../../../../model/checkbox";

@Component({
  selector: 'checkbox-text-answers',
  templateUrl: 'checkbox-text-answers.component.html'
})

export class CheckboxTextAnswersComponent {

  @Input() answers!: Answer[];
  @Input() checkbox!: Checkbox;

}
