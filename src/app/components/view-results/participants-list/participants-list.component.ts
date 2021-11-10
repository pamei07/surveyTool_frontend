import {Component, Input, OnInit} from '@angular/core';
import {Survey} from "../../../model/survey";
import {User} from "../../../model/user";

@Component({
  selector: 'participants-list',
  templateUrl: 'participants-list.component.html'
})

export class ParticipantsListComponent implements OnInit {

  @Input() survey!: Survey;
  @Input() filteredAndSortedParticipants!: User[];
  @Input() overallNoOfParticipants!: number;

  constructor() {
  }

  ngOnInit() {
  }

}
