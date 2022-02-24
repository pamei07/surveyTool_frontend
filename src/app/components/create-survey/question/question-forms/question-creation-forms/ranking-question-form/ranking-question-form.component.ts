import {Component, Input, OnInit} from '@angular/core';
import {Survey} from "../../../../../../model/survey";
import {FormGroup, FormGroupDirective} from "@angular/forms";

@Component({
  selector: 'app-ranking-question-form',
  templateUrl: './ranking-question-form.component.html'
})
export class RankingQuestionFormComponent implements OnInit {

  @Input() survey!: Survey;
  @Input() indexQuestionGroup!: number;
  questionForm!: FormGroup;

  constructor(private parentFormGroup: FormGroupDirective) {
  }

  ngOnInit() {
    this.questionForm = this.parentFormGroup.control;
  }

}
