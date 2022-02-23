import {Component, Input, OnInit} from '@angular/core';
import {FormGroup, FormGroupDirective} from "@angular/forms";
import {Survey} from "../../../../../../model/survey";

@Component({
  selector: 'app-text-question-form',
  templateUrl: './text-question-form.component.html'
})
export class TextQuestionFormComponent implements OnInit {

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
