import {QuestionGroup} from "./question-group";
import {User} from "./user";

export class Survey {
  id: number | undefined;
  name: string = '';
  description: string = '';
  startDate: string = '';
  endDate: string = '';
  open: boolean | undefined;
  accessID: string | undefined;
  uuid: string | undefined;
  user: User | undefined;
  questionGroups: QuestionGroup[] | undefined;
}
