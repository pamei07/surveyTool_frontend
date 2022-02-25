import {Component, Input, OnInit} from '@angular/core';
import {Survey} from "../../../../../../model/survey";
import {FormGroup, FormGroupDirective} from "@angular/forms";

@Component({
  selector: 'app-ranking-question-update-form',
  templateUrl: './ranking-question-update-form.component.html'
})
export class RankingQuestionUpdateFormComponent implements OnInit {

  @Input() survey!: Survey;
  @Input() indexQuestionGroup!: number;
  @Input() indexQuestion!: number;
  updateForm!: FormGroup;

  get lowestRated() {
    return this.updateForm.get('rankingGroup')?.get('lowestRated');
  }

  get highestRated() {
    return this.updateForm.get('rankingGroup')?.get('highestRated');
  }

  constructor(private parentFormGroup: FormGroupDirective) {
  }

  ngOnInit() {
    this.updateForm = this.parentFormGroup.control;
  }

}
