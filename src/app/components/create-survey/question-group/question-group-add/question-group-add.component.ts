import {Component, Input} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Survey} from "../../../../model/survey";
import {QuestionGroup} from "../../../../model/question-group";
import {stringNotEmpty} from "../../../../directives/string-validation.directive";

@Component({
  selector: 'app-question-group-add',
  templateUrl: 'question-group-add.component.html'
})

export class QuestionGroupAddComponent {

  @Input() survey!: Survey;

  questionGroupForm = this.fb.group({
    title: ['', [Validators.required, Validators.maxLength(255), stringNotEmpty()]]
  })

  get title() {
    return this.questionGroupForm.get('title');
  }

  constructor(private fb: FormBuilder) {
  }

  addNewQuestionGroup() {
    if (this.questionGroupForm.invalid) {
      return;
    }

    let questionGroup = new QuestionGroup();
    questionGroup.title = this.questionGroupForm.value.title;

    this.survey.questionGroups!.push(questionGroup);

    this.questionGroupForm.reset();
  }
}
