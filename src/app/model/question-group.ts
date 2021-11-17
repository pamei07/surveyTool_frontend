import {Question} from "./question";

export class QuestionGroup {
  id: number | undefined;
  title: string | undefined;
  questions: Question[] = [];
}
