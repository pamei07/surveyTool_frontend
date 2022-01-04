import {Component, Input, OnInit} from '@angular/core';
import {Survey} from "../../../../model/survey";
import {User} from "../../../../model/user";
import {UserService} from "../../../../services/user/user.service";

@Component({
  selector: 'app-participants-list',
  templateUrl: 'participants-list.component.html'
})

export class ParticipantsListComponent implements OnInit {

  @Input() survey!: Survey;
  participants!: User[];
  filteredAndSortedParticipants!: User[];
  overallNoOfParticipants!: number;

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.fetchAndSetParticipants();
  }

  private fetchAndSetParticipants() {
    this.userService.findParticipatingUsersBySurveyId(this.survey.id).subscribe((users) => {
      this.participants = users;
      this.filterAndSortParticipants(this.participants);
      this.overallNoOfParticipants = this.participants.length;
    });
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
