import {Component, Input, OnInit} from '@angular/core';
import {Survey} from "../../../../../../model/survey";
import {FormGroup, FormGroupDirective} from "@angular/forms";

@Component({
  selector: 'app-multiple-choice-question-form',
  templateUrl: './multiple-choice-question-form.component.html'
})
export class MultipleChoiceQuestionFormComponent implements OnInit {

  @Input() survey!: Survey;
  @Input() indexQuestionGroup!: number;
  questionForm!: FormGroup;

  get minSelect() {
    return this.questionForm.get('checkboxGroup')?.get('minSelect');
  }

  get maxSelect() {
    return this.questionForm.get('checkboxGroup')?.get('maxSelect');
  }

  constructor(private parentFormGroup: FormGroupDirective) {
  }

  ngOnInit() {
    this.questionForm = this.parentFormGroup.control;
  }

  enableDisableMinMaxInput() {
    if (this.minSelect?.enabled && this.maxSelect?.enabled) {
      this.minSelect?.disable();
      this.maxSelect?.disable();
    } else if (this.minSelect?.disabled && this.maxSelect?.disabled) {
      this.minSelect?.enable();
      this.maxSelect?.enable();
    }
  }
}
