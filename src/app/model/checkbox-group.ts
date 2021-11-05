import {Question} from "./question";
import {Checkbox} from "./checkbox";

export class CheckboxGroup {
  id: number | undefined;
  multipleSelect: boolean | undefined;
  minSelect: number = 0;
  maxSelect: number = 2;
  question: Question | undefined;
  checkboxes: Checkbox[] = [];
}
