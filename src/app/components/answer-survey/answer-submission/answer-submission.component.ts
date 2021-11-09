import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormGroup, FormGroupDirective} from "@angular/forms";

@Component({
  selector: 'answer-submission',
  templateUrl: 'answer-submission.component.html'
})

export class AnswerSubmissionComponent implements OnInit {

  @Output() postAnswers = new EventEmitter;
  parentForm!: FormGroup;

  constructor(private parentFormGroup: FormGroupDirective) {
  }

  ngOnInit() {
    this.parentForm = this.parentFormGroup.control;
  }

  post() {
    this.postAnswers.emit();
  }
}
