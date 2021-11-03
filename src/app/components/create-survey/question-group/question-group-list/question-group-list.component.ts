import {Component, Input, OnInit} from '@angular/core';
import {Survey} from "../../../../model/survey";
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'question-group-list',
  templateUrl: 'question-group-list.component.html'
})

export class QuestionGroupListComponent implements OnInit {

  @Input() survey!: Survey;

  updateForm = this.fb.group({
    title: ['']
  })

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
  }

  deleteQuestionGroup(indexQuestionGroup: number) {
    this.survey.questionGroups?.splice(indexQuestionGroup, 1);
  }

  updateQuestionGroup(indexQuestionGroup: number) {
    console.log(this.survey.questionGroups);
    this.survey.questionGroups![indexQuestionGroup].title = this.updateForm.value.title;
  }

  openModal(title: string | undefined) {
    this.updateForm.setValue({title: title});
  }
}
