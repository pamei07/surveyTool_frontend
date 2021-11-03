import {Component, Input, OnInit} from '@angular/core';
import {Survey} from "../../../../model/survey";
import {FormBuilder} from "@angular/forms";
import {Question} from "../../../../model/question";

@Component({
  selector: 'question-list',
  templateUrl: 'question-list.component.html'
})

export class QuestionListComponent implements OnInit {

  @Input() survey!: Survey;
  @Input() indexQuestionGroup!: number;

  updateForm = this.fb.group({
    text: [''],
    required: false,
    checkboxGroup: this.fb.group({
      multipleSelect: false,
      minSelect: [''],
      maxSelect: ['']
    })
  })

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
  }

  deleteQuestion(indexQuestion: number) {
    this.survey.questionGroups![this.indexQuestionGroup].questions!.splice(indexQuestion, 1);
  }

  updateQuestion(indexQuestion: number) {
    let questionToUpdate = this.survey.questionGroups![this.indexQuestionGroup].questions![indexQuestion];
    questionToUpdate.text = this.updateForm.value.text;
    questionToUpdate.required = this.updateForm.value.required;

    if (questionToUpdate.hasCheckbox) {
      let checkboxGroupToUpdate = questionToUpdate.checkboxGroup!;
      checkboxGroupToUpdate.multipleSelect = this.updateForm.value.checkboxGroup.multipleSelect;
      checkboxGroupToUpdate.minSelect = this.updateForm.value.checkboxGroup.minSelect;
      checkboxGroupToUpdate.maxSelect = this.updateForm.value.checkboxGroup.maxSelect;
      questionToUpdate.checkboxGroup = checkboxGroupToUpdate;
    }

    this.survey.questionGroups![this.indexQuestionGroup].questions![indexQuestion] = questionToUpdate;
  }

  openModal(question: Question) {
    this.updateForm.patchValue({
      text: question.text,
      required: question.required,
    })

    if (question.hasCheckbox) {
      this.updateForm.patchValue({
        checkboxGroup: {
          multipleSelect: question.checkboxGroup!.multipleSelect,
          minSelect: question.checkboxGroup!.minSelect,
          maxSelect: question.checkboxGroup!.maxSelect
        }
      })
    }
  }
}
