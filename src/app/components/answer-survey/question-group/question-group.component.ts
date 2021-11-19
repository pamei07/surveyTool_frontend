import {Component, Input, OnInit} from '@angular/core';
import {QuestionGroup} from "../../../model/question-group";
import {FormGroup, FormGroupDirective} from "@angular/forms";

@Component({
  selector: 'app-question-group',
  templateUrl: 'question-group.component.html'
})

export class QuestionGroupComponent implements OnInit {

  @Input() questionGroup!: QuestionGroup;
  @Input() questionGroupIndex!: number;
  parentForm!: FormGroup;

  constructor(private parentFormGroup: FormGroupDirective) {
  }

  ngOnInit() {
    this.parentForm = this.parentFormGroup.control;
  }
}
