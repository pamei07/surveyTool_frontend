export class Answer {
  id: number | undefined;
  text: string | undefined;

  userId: number | undefined;
  userName: string | undefined;

  questionId: number | undefined;
  checkboxId: number | undefined;

  setText(text: string) {
    this.text = text;
  }

  setQuestionId(questionId: number | undefined) {
    this.questionId = questionId;
  }

  setCheckboxId(checkboxId: number | undefined) {
    this.checkboxId = checkboxId;
  }

  setUserId(userId: number | undefined) {
    this.userId = userId;
  }
}
