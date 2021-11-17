import {Component, Input, OnInit} from '@angular/core';
import {Survey} from "../../../model/survey";
import {User} from "../../../model/user";
import {UserService} from "../../../services/user/user.service";

@Component({
  selector: 'creator-open-survey',
  templateUrl: 'creator-open-survey.component.html'
})

export class CreatorOpenSurveyComponent implements OnInit {

  @Input() survey!: Survey;
  user!: User;

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.userService.getUserById(this.survey.userID).subscribe(user => {
      this.user = user;
    });
  }
}
