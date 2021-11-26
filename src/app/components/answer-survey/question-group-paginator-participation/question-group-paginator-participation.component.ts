import {Component, Input, OnInit} from '@angular/core';
import {QuestionGroup} from "../../../model/question-group";
import {FormArray, FormGroup, FormGroupDirective} from "@angular/forms";

@Component({
  selector: 'app-question-group-paginator-participation',
  templateUrl: './question-group-paginator-participation.component.html'
})
export class QuestionGroupPaginatorParticipationComponent implements OnInit {

  @Input() questionGroups!: QuestionGroup[];
  page: number = 1;
  parentForm!: FormGroup;

  constructor(private parentFormGroup: FormGroupDirective) {
  }

  get questionGroupsFormArray() {
    return this.parentForm.get('questionGroupsFormArray') as FormArray;
  }

  ngOnInit() {
    this.parentForm = this.parentFormGroup.control;
  }

  goBack() {
    this.page -= 1;
  }

  goNext() {
    this.page += 1;
  }

  goTo() {
    let goToSelection = document.getElementById('goToSelection') as HTMLInputElement;
    this.page = Number(goToSelection?.value);
  }

}
