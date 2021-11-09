import {Component, Input, OnInit} from '@angular/core';
import {FormGroup, FormGroupDirective} from "@angular/forms";
import {Question} from "../../../../model/question";

@Component({
  selector: 'text-question',
  templateUrl: 'text-question.component.html'
})

export class TextQuestionComponent implements OnInit {

  @Input() questionGroupIndex!: number;
  @Input() question!: Question;
  @Input() questionIndex!: number;
  parentForm!: FormGroup;

  get text() {
    return this.parentForm.get('questionGroupsFormArray')
      ?.get(this.questionGroupIndex.toString())
      ?.get(this.questionIndex.toString());
  }

  constructor(private parentFormGroup: FormGroupDirective) {
  }

  ngOnInit() {
    this.parentForm = this.parentFormGroup.control;
  }
}
