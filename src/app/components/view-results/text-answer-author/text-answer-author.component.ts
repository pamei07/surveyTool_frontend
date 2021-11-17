import {Component, Input, OnInit} from '@angular/core';
import {Answer} from "../../../model/answer";
import {User} from "../../../model/user";
import {UserService} from "../../../services/user/user.service";

@Component({
  selector: 'text-answer-author',
  templateUrl: 'text-answer-author.component.html'
})

export class TextAnswerAuthorComponent implements OnInit {

  @Input() answer!: Answer;
  user!: User;

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.userService.getUserById(this.answer.userID).subscribe(user => {
      this.user = user;
    });
  }
}
