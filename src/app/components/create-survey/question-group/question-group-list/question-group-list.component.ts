import {Component, Input} from '@angular/core';
import {Survey} from "../../../../model/survey";
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";
import {Checkbox} from "../../../../model/checkbox";

@Component({
  selector: 'app-question-group-list',
  templateUrl: 'question-group-list.component.html'
})

export class QuestionGroupListComponent {

  @Input() survey!: Survey;

  drop($event: CdkDragDrop<Checkbox[]>) {
    moveItemInArray(this.survey.questionGroups, $event.previousIndex, $event.currentIndex);
  }
}
