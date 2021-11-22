import {QuestionGroup} from "./question-group";

export class Survey {
  id: number | undefined;
  name: string = '';
  description: string = '';
  startDate: string = '';
  endDate: string = '';
  openAccess: boolean | undefined;
  accessId: string | undefined;
  participationId: string | undefined;
  questionGroups: QuestionGroup[] = [];

  userId: number | undefined;
  userName: string | undefined;

  setUserId(userId: number | undefined) {
    this.userId = userId;
  }

  setOpenAccess(bool: boolean) {
    this.openAccess = bool;
  }
}
