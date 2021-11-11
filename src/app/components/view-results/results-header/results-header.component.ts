import {Component, OnInit} from '@angular/core';
import {Survey} from "../../../model/survey";
import {User} from "../../../model/user";

@Component({
  selector: 'results-header',
  templateUrl: 'results-header.component.html'
})

export class ResultsHeaderComponent implements OnInit {
  survey!: Survey;
  uniqueParticipants: User[] = [];

  constructor() {
  }

  ngOnInit() {
  }

  showSurvey(survey: Survey) {
    this.survey = survey;
    this.uniqueParticipants = [];
    console.log(this.survey);
  }

  processUsers(users: User[]) {
    this.addUsersToListIfNotPresent(users);
  }

  private addUsersToListIfNotPresent(users: User[]) {
    users.forEach((user) => {
      if (!this.uniqueParticipants.some(listedUser => listedUser.id === user.id)) {
        this.uniqueParticipants.push(user);
      }
    })

    // Use empty array to create a new one with concat => trigger ngOnChange() of child component 'participants-list'
    let tempArray: User[] = [];
    this.uniqueParticipants = tempArray.concat(this.uniqueParticipants);
  }
}
