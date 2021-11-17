import {Component, OnInit} from '@angular/core';
import {Survey} from "../../../model/survey";
import {User} from "../../../model/user";
import {UserService} from "../../../services/user/user.service";

@Component({
  selector: 'results-header',
  templateUrl: 'results-header.component.html'
})

export class ResultsHeaderComponent implements OnInit {
  survey!: Survey;
  user: User | undefined;

  constructor(private userService: UserService) {
  }

  ngOnInit() {
  }

  showSurvey(survey: Survey) {
    this.survey = survey;
    this.user = undefined;
    if (this.survey.userID !== null) {
      this.userService.getUserById(this.survey.userID).subscribe(user => {
        this.user = user;
        console.log(this.user);
      })
    }
    console.log(this.survey);
  }
}
