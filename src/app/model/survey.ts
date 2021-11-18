import {QuestionGroup} from "./question-group";

export class Survey {
  id: number | undefined;
  name: string = '';
  description: string = '';
  startDate: string = '';
  endDate: string = '';
  open: boolean | undefined;
  accessID: string | undefined;
  uuid: string | undefined;
  questionGroups: QuestionGroup[] = [];

  userID: number | undefined;
  userName: string | undefined;

  setUserID(userID: number | undefined) {
    this.userID = userID;
  }

  setOpen(bool: boolean) {
    this.open = bool;
  }
}
