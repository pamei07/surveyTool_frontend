export class Answer {
  id: number | undefined;
  text: string | undefined;
  rank: number | undefined;
  participantName: string | undefined;
  participantId: string | undefined;

  userId: number | undefined;

  questionId: number | undefined;
  checkboxId: number | undefined;
  optionId: number | undefined;

  setText(text: string) {
    this.text = text;
  }

  setRank(rank: number) {
    this.rank = rank;
  }

  setQuestionId(questionId: number | undefined) {
    this.questionId = questionId;
  }

  setCheckboxId(checkboxId: number | undefined) {
    this.checkboxId = checkboxId;
  }

  setOptionId(optionId: number | undefined) {
    this.optionId = optionId;
  }

  setUserId(userId: number | undefined) {
    this.userId = userId;
  }

  setParticipantName(participantName: string) {
    this.participantName = participantName;
  }
}
