import {Component, Input, OnInit} from '@angular/core';
import {Survey} from "../../../../model/survey";

@Component({
  selector: 'question-group-list',
  templateUrl: 'question-group-list.component.html'
})

export class QuestionGroupListComponent implements OnInit {

  @Input() survey!: Survey;
  newTitle: string | undefined;

  constructor() {
    this.newTitle = '';
  }

  ngOnInit() {
  }

  deleteQuestionGroup(indexQuestionGroup: number) {
    console.log(this.survey.questionGroups);
    this.survey.questionGroups?.splice(indexQuestionGroup, 1);
    console.log(this.survey.questionGroups);
    sessionStorage.setItem('newSurvey', JSON.stringify(this.survey));
  }

  updateQuestionGroup(indexQuestionGroup: number) {
    console.log(this.survey.questionGroups);
    this.survey.questionGroups![indexQuestionGroup].title = this.newTitle;
    sessionStorage.setItem('newSurvey', JSON.stringify(this.survey));
  }

  openModal(title: string | undefined) {
    this.newTitle = title;
  }
}
