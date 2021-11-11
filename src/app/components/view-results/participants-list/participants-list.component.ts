import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Survey} from "../../../model/survey";
import {User} from "../../../model/user";

@Component({
  selector: 'participants-list',
  templateUrl: 'participants-list.component.html'
})

export class ParticipantsListComponent implements OnInit, OnChanges {

  @Input() survey!: Survey;
  @Input() uniqueParticipants!: User[];
  filteredAndSortedParticipants!: User[];
  overallNoOfParticipants!: number;

  constructor() {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.filterAndSortParticipants(this.uniqueParticipants);
    this.overallNoOfParticipants = this.uniqueParticipants.length;
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
