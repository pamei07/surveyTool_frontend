import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {Survey} from "../../../../model/survey";

@Component({
  selector: 'question-update',
  templateUrl: 'question-update.component.html'
})

export class QuestionUpdateComponent implements OnInit {

  @Input() survey!: Survey;
  @Input() indexQuestionGroup!: number;
  @Input() indexQuestion!: number;


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
    let questionToUpdate = this.survey.questionGroups![this.indexQuestionGroup].questions![this.indexQuestion];
    this.updateForm.patchValue({
      text: questionToUpdate.text,
      required: questionToUpdate.required,
    })

    if (questionToUpdate.hasCheckbox) {
      this.updateForm.patchValue({
        checkboxGroup: {
          multipleSelect: questionToUpdate.checkboxGroup!.multipleSelect,
          minSelect: questionToUpdate.checkboxGroup!.minSelect,
          maxSelect: questionToUpdate.checkboxGroup!.maxSelect
        }
      })
    }
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

}
