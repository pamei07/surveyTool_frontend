import {Answer} from "./answer";
import {Survey} from "./survey";

export class User {
  id: number | undefined;
  name: string | undefined;
  firstName: string | undefined;
  lastName: string | undefined;
  email: string | undefined;
  answers: Answer[] | undefined;
  survey: Survey[] | undefined;

  setName(name: string | undefined) {
    this.name = name;
  }

  setFirstName(firstName: string | undefined) {
    this.firstName = firstName;
  }

  setLastName(lastName: string | undefined) {
    this.lastName = lastName;
  }

  setEmail(email: string | undefined) {
    this.email = email;
  }
}
