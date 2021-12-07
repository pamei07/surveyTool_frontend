import {Component, Input} from '@angular/core';
import {Survey} from "../../../../model/survey";
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";
import {Question} from "../../../../model/question";

@Component({
  selector: 'app-question-list',
  templateUrl: 'question-list.component.html'
})

export class QuestionListComponent {

  @Input() survey!: Survey;
  @Input() indexQuestionGroup!: number;

  drop($event: CdkDragDrop<Question[]>) {
    moveItemInArray(this.survey.questionGroups[this.indexQuestionGroup].questions, $event.previousIndex, $event.currentIndex);
  }

}
