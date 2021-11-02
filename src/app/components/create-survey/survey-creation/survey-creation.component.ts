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

  surveyForm = this.fb.group({
    name: [''],
    description: [''],
    startDate: [''],
    endDate: [''],
    questionGroups: this.fb.array([this.fb.group({
      title: [''],
      questions: this.fb.array([this.fb.group({
        text: [''],
        required: [false],
        hasCheckbox: [false],
        checkboxGroup: this.fb.group({
          multipleSelect: [false],
          minSelect: [''],
          maxSelect: [''],
          checkboxes: this.fb.array([this.fb.group({
            hasTextField: [false],
            text: ['']
          })])
        })
      })])
    })])
  })

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private fb: FormBuilder) {
    this.survey = new Survey();
    this.survey.questionGroups = [];
  }

  ngOnInit() {
  }

  setBasicInfoGivenToTrue() {
    this.basicInfoGiven = true;
  }
}
