import {CheckboxGroup} from "./checkbox-group";
import {Answer} from "./answer";

export class Checkbox {
  id: number | undefined;
  text: string | undefined;
  hasTextField: boolean | undefined;
  checkboxGroup: CheckboxGroup | undefined;
  answers: Answer[] = [];
}
