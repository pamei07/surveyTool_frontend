import {Component, Input, OnInit} from '@angular/core';
import {Survey} from "../../../../../model/survey";
import {AnswerService} from "../../../../../services/answer/answer.service";
import {Router} from "@angular/router";
import {Answer} from "../../../../../model/answer";

@Component({
  selector: 'app-edit-delete-survey',
  templateUrl: './edit-delete-survey-buttons.component.html'
})
export class EditDeleteSurveyButtonsComponent implements OnInit {

  @Input() survey!: Survey;
  answered: boolean = false;

  constructor(private answerService: AnswerService,
              private router: Router) {
  }

  ngOnInit() {
    this.answerService.findAnswersBySurveyId(this.survey.id).subscribe(
      (response: Answer[]) => {
        if (response.length > 0) {
          this.answered = true;
        }
      }
    )
  }

  navigateToEditPage() {
    this.router.navigate(["surveys/edit", this.survey.accessId]);
  }
}
