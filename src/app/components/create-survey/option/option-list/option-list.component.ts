import {Component, Input} from '@angular/core';
import {Survey} from "../../../../model/survey";
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";
import {Checkbox} from "../../../../model/checkbox";

@Component({
  selector: 'app-option-list',
  templateUrl: './option-list.component.html'
})
export class OptionListComponent {

  @Input() survey!: Survey;
  @Input() indexQuestionGroup!: number;
  @Input() indexQuestion!: number;

  get rankingGroup() {
    return this.survey.questionGroups[this.indexQuestionGroup].questions[this.indexQuestion].rankingGroup;
  }

  get options() {
    return this.survey.questionGroups[this.indexQuestionGroup].questions[this.indexQuestion].rankingGroup!.options;
  }

  get noOfOptions() {
    return this.survey.questionGroups[this.indexQuestionGroup].questions[this.indexQuestion].rankingGroup!.options.length;
  }

  drop($event: CdkDragDrop<Checkbox[]>) {
    moveItemInArray(this.options, $event.previousIndex, $event.currentIndex);
  }
}
