import {Component, Input, OnInit} from '@angular/core';
import {Survey} from "../../../../model/survey";
import {UserService} from "../../../../services/user/user.service";
import {AnswerService} from "../../../../services/answer/answer.service";
import {KeyValue} from "@angular/common";

@Component({
  selector: 'app-participants-list',
  templateUrl: 'participants-list.component.html'
})

export class ParticipantsListComponent implements OnInit {

  @Input() survey!: Survey;
  participants!: Map<string | undefined, string | undefined>;
  filteredAndSortedParticipants!: Map<string | undefined, string | undefined>;
  overallNoOfParticipants!: number;

  valueAscOrder = (a: KeyValue<string | undefined, string | undefined>, b: KeyValue<string | undefined, string | undefined>): number => {
    // @ts-ignore
    return a.value.localeCompare(b.value);
  }

  constructor(private userService: UserService, private answerService: AnswerService) {
  }

  ngOnInit() {
    this.fetchAndSetParticipants();
  }

  private fetchAndSetParticipants() {
    this.answerService.findAnswersBySurveyId(this.survey.id).subscribe((answers) => {
      let participants = new Map<string | undefined, string | undefined>();
      answers.forEach(answer => {
        let participantId = answer.participantId;
        let participantName = answer.participantName;
        if (!participants.has(participantId)) {
          participants.set(participantId, participantName);
        }
      })
      this.participants = participants;
      this.filteredAndSortedParticipants = this.removeAnonymousUsers(this.participants);
      console.log(this.filteredAndSortedParticipants)
      this.overallNoOfParticipants = this.participants.size;
    })
  }

  private removeAnonymousUsers(participants: Map<string | undefined, string | undefined>) {
    let filteredParticipants = new Map<string | undefined, string | undefined>();
    for (let [id, name] of participants) {
      if (name != 'Anonym') {
        filteredParticipants.set(id, name);
      }
    }
    return filteredParticipants;
  }
}
