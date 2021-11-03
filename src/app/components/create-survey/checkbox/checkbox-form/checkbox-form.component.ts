import {Component, Input, OnInit} from '@angular/core';
import {Survey} from "../../../../model/survey";
import {Checkbox} from "../../../../model/checkbox";
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'checkbox-form',
  templateUrl: 'checkbox-form.component.html'
})

export class CheckboxFormComponent implements OnInit {

  @Input() survey!: Survey;
  @Input() indexQuestionGroup!: number;
  @Input() indexQuestion!: number;

  checkboxForm = this.fb.group({
    text: [''],
    hasTextField: false
  })

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
  }

  addCheckboxToQuestion() {
    let checkbox = new Checkbox();
    checkbox.text = this.checkboxForm.value.text;
    checkbox.hasTextField = this.checkboxForm.value.hasTextField;

    this.survey
      .questionGroups![this.indexQuestionGroup]
      .questions![this.indexQuestion]
      .checkboxGroup!
      .checkboxes!.push(checkbox);

    this.checkboxForm.reset();
  }

}
