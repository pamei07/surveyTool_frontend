import {Answer} from "./answer";

export class Checkbox {
  id: number | undefined;
  text: string | undefined;
  hasTextField: boolean | undefined;
  answers: Answer[] = [];
}
