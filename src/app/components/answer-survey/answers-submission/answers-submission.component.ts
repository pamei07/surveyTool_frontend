import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormGroup, FormGroupDirective} from "@angular/forms";

@Component({
  selector: 'answers-submission',
  templateUrl: 'answers-submission.component.html'
})

export class AnswersSubmissionComponent implements OnInit {

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
