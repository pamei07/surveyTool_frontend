import {Question} from "./question";
import {Checkbox} from "./checkbox";
import {User} from "./user";

export class Answer {
  id: number | undefined;
  text: string | undefined;
  user: User | undefined;
  question: Question | undefined;
  checkbox: Checkbox | undefined;

  setText(text: string) {
    this.text = text;
  }

  setQuestion(question: Question) {
    this.question = question;
  }

  setCheckbox(checkbox: Checkbox) {
    this.checkbox = checkbox;
  }

  setUser(user: User) {
    this.user = user;
  }
}
