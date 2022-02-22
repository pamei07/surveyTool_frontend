import {CheckboxGroup} from "./checkbox-group";
import {QuestionType} from "./questionType";

export class Question {
  id: number | undefined;
  text: string | undefined;
  required: boolean | undefined;
  questionType: QuestionType | undefined;
  checkboxGroup: CheckboxGroup | undefined;
}
