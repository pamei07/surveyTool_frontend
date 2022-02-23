import {Component, Input, OnInit} from '@angular/core';
import {Survey} from "../../../../../../model/survey";
import {FormGroup, FormGroupDirective} from "@angular/forms";

@Component({
  selector: 'app-multiple-choice-question-update-form',
  templateUrl: './multiple-choice-question-update-form.component.html'
})
export class MultipleChoiceQuestionUpdateFormComponent implements OnInit {

  @Input() survey!: Survey;
  @Input() indexQuestionGroup!: number;
  @Input() indexQuestion!: number;
  updateForm!: FormGroup;

  get minSelect() {
    return this.updateForm.get('checkboxGroup')?.get('minSelect');
  }

  get maxSelect() {
    return this.updateForm.get('checkboxGroup')?.get('maxSelect');
  }

  constructor(private parentFormGroup: FormGroupDirective) {
  }

  ngOnInit() {
    this.updateForm = this.parentFormGroup.control;
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
