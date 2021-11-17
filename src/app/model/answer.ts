export class Answer {
  id: number | undefined;
  text: string | undefined;

  userID: number | undefined;
  questionID: number | undefined;
  checkboxID: number | undefined;

  setText(text: string) {
    this.text = text;
  }

  setQuestionID(questionID: number | undefined) {
    this.questionID = questionID;
  }

  setCheckboxID(checkboxID: number | undefined) {
    this.checkboxID = checkboxID;
  }

  setUserID(userID: number | undefined) {
    this.userID = userID;
  }
}
