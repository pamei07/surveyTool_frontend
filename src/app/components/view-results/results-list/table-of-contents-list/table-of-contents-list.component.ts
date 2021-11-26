import {Component, Input, OnInit} from '@angular/core';
import {QuestionGroup} from "../../../../model/question-group";

@Component({
  selector: 'app-table-of-contents-list',
  templateUrl: './table-of-contents-list.component.html'
})
export class TableOfContentsListComponent implements OnInit {

  @Input() questionGroups!: QuestionGroup[];

  constructor() {
  }

  ngOnInit(): void {
  }

  scrollToHeading(id: string) {
    let element = document.getElementById(id);
    element?.scrollIntoView();
  }
}
