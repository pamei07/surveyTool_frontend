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
  filteredAndSortedParticipants: User[] = [];

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
    this.filterAndSortParticipants(this.uniqueParticipants);
  }

  private addUsersToListIfNotPresent(users: User[]) {
    users.forEach((user) => {
      if (!this.uniqueParticipants.some(listedUser => listedUser.id === user.id)) {
        this.uniqueParticipants.push(user);
      }
    })
  }

  private filterAndSortParticipants(participants: User[]) {
    let filteredParticipants = this.removeAnonymousUsers(participants);
    this.filteredAndSortedParticipants = this.sortParticipants(filteredParticipants);
  }

  private removeAnonymousUsers(participants: User[]) {
    return participants.filter(user => user.name != 'Anonym');
  }

  private sortParticipants(participants: User[]) {
    return participants.sort((user1, user2) => {
      let name1 = user1.name?.toUpperCase();
      let name2 = user2.name?.toUpperCase();
      // @ts-ignore
      if (name1 < name2) {
        return -1;
      }
      // @ts-ignore
      if (name1 > name2) {
        return 1;
      }
      return 0;
    })
  }
}
