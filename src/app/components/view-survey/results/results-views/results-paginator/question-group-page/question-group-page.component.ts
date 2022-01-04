import {Component, Input} from '@angular/core';
import {QuestionGroup} from "../../../../../../model/question-group";

@Component({
  selector: 'app-question-group-page',
  templateUrl: './question-group-page.component.html'
})
export class QuestionGroupPageComponent {

  @Input() questionGroup!: QuestionGroup;

  scrollToHeading(id: string) {
    let element = document.getElementById(id);
    element?.scrollIntoView();
  }
}
