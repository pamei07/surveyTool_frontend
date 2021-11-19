import {Component} from '@angular/core';
import {Survey} from "../../../model/survey";
import {QuestionGroup} from "../../../model/question-group";
import {Question} from "../../../model/question";
import {CheckboxGroup} from "../../../model/checkbox-group";
import {Checkbox} from "../../../model/checkbox";

@Component({
  selector: 'survey-creation',
  templateUrl: 'survey-creation.component.html'
})

export class SurveyCreationComponent {

  survey!: Survey;
  basicInfoGiven = false;

  constructor() {
    this.survey = new Survey();
    this.survey.name = "Test Umfrage";
    this.survey.startDate = "2021-11-29T10:00:00";
    this.survey.endDate = "2021-12-08T08:39:00";

    let questionGroup = new QuestionGroup();
    questionGroup.title = "Frageblock Beispiel";

    let questionCheckboxes = new Question();
    questionCheckboxes.text = "Beispielfrage";
    questionCheckboxes.hasCheckbox = true;
    let checkboxGroup = new CheckboxGroup();
    checkboxGroup.multipleSelect = false;
    let checkbox1 = new Checkbox();
    checkbox1.text = "Ja";
    let checkbox2 = new Checkbox();
    checkbox2.text = "Nein";
    checkboxGroup.checkboxes.push(checkbox1, checkbox2);
    questionCheckboxes.checkboxGroup = checkboxGroup;

    questionGroup.questions.push(questionCheckboxes);
    this.survey.questionGroups.push(questionGroup);

    this.basicInfoGiven = true;
  }

  setBasicInfoGiven(bool: boolean) {
    this.basicInfoGiven = bool;
  }
}
