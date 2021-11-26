import {Component, Input, OnInit} from '@angular/core';
import {QuestionGroup} from "../../../model/question-group";
import {FormGroup, FormGroupDirective} from "@angular/forms";

@Component({
  selector: 'app-question-group-page-participation',
  templateUrl: 'question-group-page-participation.component.html'
})

export class QuestionGroupPageParticipationComponent implements OnInit {

  @Input() questionGroup!: QuestionGroup;
  @Input() questionGroupIndex!: number;
  parentForm!: FormGroup;

  constructor(private parentFormGroup: FormGroupDirective) {
  }

  ngOnInit() {
    this.parentForm = this.parentFormGroup.control;
  }
}
