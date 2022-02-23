import {Component, Input, OnInit} from '@angular/core';
import {Survey} from "../../../../../../model/survey";
import {FormGroup, FormGroupDirective} from "@angular/forms";

@Component({
  selector: 'app-base-question-update-form',
  templateUrl: './base-question-update-form.component.html'
})
export class BaseQuestionUpdateFormComponent implements OnInit {

  @Input() survey!: Survey;
  @Input() indexQuestionGroup!: number;
  @Input() indexQuestion!: number;
  updateForm!: FormGroup;

  get text() {
    return this.updateForm.get('text');
  }

  constructor(private parentFormGroup: FormGroupDirective) {
  }

  ngOnInit() {
    this.updateForm = this.parentFormGroup.control;
  }
}
