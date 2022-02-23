import {Component, Input, OnInit} from '@angular/core';
import {Survey} from "../../../../../model/survey";
import {FormGroup, FormGroupDirective} from "@angular/forms";

@Component({
  selector: 'app-base-question-form',
  templateUrl: './base-question-form.component.html'
})
export class BaseQuestionFormComponent implements OnInit {

  @Input() survey!: Survey;
  @Input() indexQuestionGroup!: number;
  questionForm!: FormGroup;

  get text() {
    return this.questionForm.get('text');
  }

  constructor(private parentFormGroup: FormGroupDirective) {
  }

  ngOnInit() {
    this.questionForm = this.parentFormGroup.control;
  }

}
