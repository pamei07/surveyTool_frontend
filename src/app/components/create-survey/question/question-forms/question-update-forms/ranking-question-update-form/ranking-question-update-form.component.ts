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

  get leastRated_label() {
    return this.updateForm.get('rankingGroup')?.get('leastRated_label');
  }

  get highestRated_label() {
    return this.updateForm.get('rankingGroup')?.get('highestRated_label');
  }

  constructor(private parentFormGroup: FormGroupDirective) {
  }

  ngOnInit() {
    this.updateForm = this.parentFormGroup.control;
  }

}
