import {Component, OnInit} from '@angular/core';
import {Survey} from "../../../model/survey";
import {QuestionGroup} from "../../../model/question-group";
import {Question} from "../../../model/question";
import {CheckboxGroup} from "../../../model/checkbox-group";
import {Checkbox} from "../../../model/checkbox";

@Component({
  selector: 'survey-creation',
  templateUrl: 'survey-creation.component.html'
})

export class SurveyCreationComponent implements OnInit {

  survey!: Survey;
  basicInfoGiven = false;

  constructor() {
    this.survey = new Survey();
  }

  ngOnInit() {
    this.basicInfoGiven = true;
    this.survey.name = "test";
    this.survey.endDate = "2021-12-08T08:39:00";
    this.survey.startDate = "2021-11-03T08:39:00";
    let questionGroup = new QuestionGroup();
    questionGroup.title = 'test block';
    let questionCheckboxes = new Question();
    questionCheckboxes.text = 'jo';
    questionCheckboxes.hasCheckbox = true;
    let checkboxGroup = new CheckboxGroup();
    checkboxGroup.multipleSelect = true;
    checkboxGroup.minSelect = 1;
    checkboxGroup.maxSelect = 2;
    let checkbox1 = new Checkbox();
    checkbox1.text = 'ja';
    let checkbox2 = new Checkbox();
    checkbox2.text = 'nein';
    let checkbox3 = new Checkbox();
    checkbox3.text = 'vllt';

    let questionWithoutCheckboxes = new Question();
    questionWithoutCheckboxes.text = 'test';
    questionWithoutCheckboxes.hasCheckbox = true;
    let checkboxGroup2 = new CheckboxGroup();
    checkboxGroup2.multipleSelect = false;
    questionWithoutCheckboxes.checkboxGroup = checkboxGroup2;

    checkboxGroup.checkboxes.push(checkbox1, checkbox2, checkbox3);
    questionCheckboxes.checkboxGroup = checkboxGroup;
    questionGroup.questions.push(questionCheckboxes, questionWithoutCheckboxes);

    this.survey.questionGroups.push(questionGroup);
  }

  setBasicInfoGiven(bool: boolean) {
    this.basicInfoGiven = bool;
  }
}
