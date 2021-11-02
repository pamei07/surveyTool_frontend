import {Component, OnInit} from '@angular/core';
import {Survey} from "../../../model/survey";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'survey-creation',
  templateUrl: 'survey-creation.component.html'
})

export class SurveyCreationComponent implements OnInit {

  survey!: Survey;
  basicInfoGiven = false;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private fb: FormBuilder) {
    this.survey = new Survey();
    this.survey.questionGroups = [];
  }

  ngOnInit() {
  }

  setBasicInfoGiven(bool: boolean) {
    this.basicInfoGiven = bool;
  }
}
