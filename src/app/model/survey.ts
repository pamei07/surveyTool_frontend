import {QuestionGroup} from "./question-group";

export class Survey {
  id: number | undefined;
  name: string = '';
  description: string = '';
  startDate: string = '';
  endDate: string = '';
  openAccess: boolean | undefined;
  anonymousParticipation: boolean | undefined;
  accessId: string | undefined;
  participationId: string | undefined;
  questionGroups: QuestionGroup[] = [];

  userId: number | undefined;
  userName: string | undefined;

  setName(name: string) {
    this.name = name;
  }

  setDescription(description: string) {
    this.description = description;
  }

  setStartDate(startDate: string) {
    this.startDate = startDate;
  }

  setEndDate(endDate: string) {
    this.endDate = endDate;
  }

  setUserId(userId: number | undefined) {
    this.userId = userId;
  }

  setOpenAccess(bool: boolean) {
    this.openAccess = bool;
  }

  setAnonymousParticipation(bool: boolean) {
    this.anonymousParticipation = bool;
  }
}
