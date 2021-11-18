import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Survey} from "../../../model/survey";

@Component({
  selector: 'survey-navigation',
  templateUrl: 'survey-navigation.component.html'
})

export class SurveyNavigationComponent implements OnInit {

  @Input() survey!: Survey;
  @Input() overview!: boolean;

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  navigateToOverview() {
    this.router.navigate(["surveys", this.survey.accessID]);
  }

  navigateToResults() {
    this.router.navigate(["surveys", this.survey.accessID, "answers"]);
  }
}
