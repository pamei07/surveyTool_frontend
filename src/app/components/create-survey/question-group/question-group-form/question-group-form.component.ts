import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {Survey} from "../../../../model/survey";
import {QuestionGroup} from "../../../../model/question-group";

@Component({
  selector: 'question-group-form',
  templateUrl: 'question-group-form.component.html'
})

export class QuestionGroupFormComponent implements OnInit {

  @Input() survey!: Survey;

  questionGroupForm = this.fb.group({
    title: ''
  })

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
