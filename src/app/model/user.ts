import {Answer} from "./answer";
import {Survey} from "./survey";

export class User {
  id: number | undefined;
  name: string | undefined;
  answers: Answer[] | undefined;
  survey: Survey[] | undefined;

  setName(name: string) {
    this.name = name;
  }
}
