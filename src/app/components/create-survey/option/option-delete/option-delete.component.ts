import {Component, Input} from '@angular/core';
import {Survey} from "../../../../model/survey";

@Component({
  selector: 'app-option-delete',
  templateUrl: './option-delete.component.html'
})
export class OptionDeleteComponent {

  @Input() survey!: Survey;
  @Input() indexQuestionGroup!: number;
  @Input() indexQuestion!: number;
  @Input() indexOption!: number;

  deleteOption(indexOption: number) {
    this.survey
      .questionGroups[this.indexQuestionGroup]
      .questions[this.indexQuestion]
      .rankingGroup!
      .options.splice(indexOption, 1);
  }

}
