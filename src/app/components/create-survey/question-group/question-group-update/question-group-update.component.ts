import {Component, Input, OnInit} from '@angular/core';
import {Survey} from "../../../../model/survey";
import {FormBuilder, Validators} from "@angular/forms";
import {stringNotEmpty} from "../../../../directives/string-validation.directive";

@Component({
  selector: 'app-question-group-update',
  templateUrl: 'question-group-update.component.html'
})

export class QuestionGroupUpdateComponent implements OnInit {

  @Input() survey!: Survey;
  @Input() indexQuestionGroup!: number;

  updateForm = this.fb.group({
    title: ['', [Validators.required, Validators.maxLength(255), stringNotEmpty()]]
  })

  get title() {
    return this.updateForm.get('title');
  }

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.updateForm.setValue({title: this.survey.questionGroups![this.indexQuestionGroup].title});
  }

  updateQuestionGroup(indexQuestionGroup: number) {
    if (this.updateForm.invalid) {
      return;
    }

    this.survey.questionGroups![indexQuestionGroup].title = this.updateForm.value.title;
  }
}
