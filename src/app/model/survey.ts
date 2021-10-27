import {QuestionGroup} from "./question-group";
import {User} from "./user";

export class Survey {
  id: number | undefined;
  name: string | undefined;
  description: string | undefined;
  startDate: string | undefined;
  endDate: string | undefined;
  open: boolean | undefined;
  accessID: string | undefined;
  uuid: string | undefined;
  user: User | undefined;
  questionGroups: QuestionGroup[] | undefined;
}
