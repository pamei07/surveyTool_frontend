import {Answer} from "./answer";
import {Survey} from "./survey";

export class User {
  id: number | undefined;
  answers: Answer[] | undefined;
  survey: Survey[] | undefined;
}
