import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Survey} from "../../../../model/survey";
import {QuestionGroup} from "../../../../model/question-group";

@Component({
  selector: 'question-group-add',
  templateUrl: 'question-group-add.component.html'
})

export class QuestionGroupAddComponent implements OnInit {

  @Input() survey!: Survey;

  questionGroupForm = this.fb.group({
    title: ['', Validators.required]
  })

  get title() {
    return this.questionGroupForm.get('title');
  }

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
  }

  addNewQuestionGroup() {
    let questionGroup = new QuestionGroup();
    questionGroup.title = this.questionGroupForm.value.title;

    this.survey.questionGroups!.push(questionGroup);

    this.questionGroupForm.reset();
  }
}
