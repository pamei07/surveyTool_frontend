import {Component, Input, OnInit} from '@angular/core';
import {QuestionGroup} from "../../../model/question-group";
import {FormBuilder, FormGroup, FormGroupDirective} from "@angular/forms";
import {AnswerService} from "../../../services/answer/answer.service";

@Component({
  selector: 'answer-question-list',
  templateUrl: 'answer-question-list.component.html'
})

export class AnswerQuestionListComponent implements OnInit {

  @Input() questionGroup!: QuestionGroup;
  @Input() questionGroupIndex!: number;
  parentForm!: FormGroup;

  constructor(private fb: FormBuilder,
              private answerService: AnswerService,
              private parentFormGroup: FormGroupDirective) {
  }

  ngOnInit() {
    this.parentForm = this.parentFormGroup.control;
  }
}
