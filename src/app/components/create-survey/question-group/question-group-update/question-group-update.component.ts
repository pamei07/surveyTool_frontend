import {Component, Input, OnInit} from '@angular/core';
import {Survey} from "../../../../model/survey";
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'question-group-update',
  templateUrl: 'question-group-update.component.html'
})

export class QuestionGroupUpdateComponent implements OnInit {

  @Input() survey!: Survey;
  @Input() indexQuestionGroup!: number;

  updateForm = this.fb.group({
    title: ['']
  })

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.updateForm.setValue({title: this.survey.questionGroups![this.indexQuestionGroup].title});
  }

  updateQuestionGroup(indexQuestionGroup: number) {
    this.survey.questionGroups![indexQuestionGroup].title = this.updateForm.value.title;
  }
}
