import {Component, Input, OnInit} from '@angular/core';
import {Survey} from "../../../../model/survey";
import {FormBuilder} from "@angular/forms";
import {Question} from "../../../../model/question";
import {CheckboxGroup} from "../../../../model/checkbox-group";

@Component({
  selector: 'question-add',
  templateUrl: 'question-add.component.html'
})

export class QuestionAddComponent implements OnInit {

  @Input() survey!: Survey;
  @Input() indexQuestionGroup!: number;

  disableInput: boolean = true;

  questionForm = this.fb.group({
    text: [''],
    required: false,
    hasCheckbox: false,
    checkboxGroup: this.fb.group({
      multipleSelect: false,
      minSelect: [''],
      maxSelect: ['']
    })
  })

  initialFormValues = this.questionForm.value;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {

  }

  addNewQuestion() {
    let question = new Question();
    question.text = this.questionForm.value.text;
    question.required = this.questionForm.value.required;
    question.hasCheckbox = this.questionForm.value.hasCheckbox;

    if (question.hasCheckbox) {
      let checkboxGroup = new CheckboxGroup();
      checkboxGroup.multipleSelect = this.questionForm.value.checkboxGroup.multipleSelect;
      checkboxGroup.minSelect = this.questionForm.value.checkboxGroup.minSelect;
      checkboxGroup.maxSelect = this.questionForm.value.checkboxGroup.maxSelect;

      question.checkboxGroup = checkboxGroup;
    }

    this.survey.questionGroups![this.indexQuestionGroup].questions!.push(question);

    if (!this.disableInput) {
      this.disableInput = true;
    }

    this.questionForm.reset(this.initialFormValues);
  }

  enableDisableMinMaxInput() {
    this.disableInput = !this.disableInput;
  }

  collapseMultipleSelectContainerWhenOpen(indexQuestionGroup: number) {
    if (document.getElementById("checkboxGroupForm" + indexQuestionGroup)!.classList.contains('show')) {
      document.getElementById('checkboxGroupForm' + indexQuestionGroup)!.classList.remove('show');
    }
  }
}
