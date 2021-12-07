import {Component, Input} from '@angular/core';
import {Survey} from "../../../../model/survey";
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";
import {Checkbox} from "../../../../model/checkbox";

@Component({
  selector: 'app-checkbox-list',
  templateUrl: 'checkbox-list.component.html'
})

export class CheckboxListComponent {

  @Input() survey!: Survey;
  @Input() indexQuestionGroup!: number;
  @Input() indexQuestion!: number;

  get checkboxGroup() {
    return this.survey.questionGroups![this.indexQuestionGroup].questions![this.indexQuestion].checkboxGroup;
  }

  get checkboxes() {
    return this.survey.questionGroups![this.indexQuestionGroup].questions![this.indexQuestion].checkboxGroup!.checkboxes;
  }

  get noOfCheckboxes() {
    return this.survey.questionGroups![this.indexQuestionGroup].questions![this.indexQuestion].checkboxGroup!.checkboxes!.length;
  }

  drop($event: CdkDragDrop<Checkbox[]>) {
    moveItemInArray(this.checkboxes, $event.previousIndex, $event.currentIndex);
  }
}
