import {CheckboxGroup} from "./checkbox-group";
import {QuestionType} from "./question-type";
import {RankingGroup} from "./ranking-group";

export class Question {
  id: number | undefined;
  text: string | undefined;
  required: boolean | undefined;
  questionType: QuestionType | undefined;
  checkboxGroup: CheckboxGroup | undefined;
  rankingGroup: RankingGroup | undefined;
}
