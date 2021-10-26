import {Question} from "./question";
import {Checkbox} from "./checkbox";

export class Answer {
  id: number | undefined;
  text: string | undefined;
  user: Object | undefined;
  question: Question | undefined;
  checkbox: Checkbox | undefined;
}
