import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./components/home/home.component";
import {SurveyBasicsComponent} from "./components/create-survey/survey-basics/survey-basics.component";
import {SurveyQuestionAddingComponent} from "./components/create-survey/survey-question-adding/survey-question-adding.component";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {QuestionGroupAddComponent} from "./components/create-survey/question-group/question-group-add/question-group-add.component";
import {QuestionGroupListComponent} from "./components/create-survey/question-group/question-group-list/question-group-list.component";
import {QuestionAddComponent} from "./components/create-survey/question/question-add/question-add.component";
import {QuestionListComponent} from "./components/create-survey/question/question-list/question-list.component";
import {CheckboxListComponent} from "./components/create-survey/checkbox/checkbox-list/checkbox-list.component";
import {SurveySubmissionComponent} from "./components/create-survey/survey-submission/survey-submission.component";
import {CheckboxAddComponent} from './components/create-survey/checkbox/checkbox-add/checkbox-add.component';
import {SurveyFinalOverviewComponent} from "./components/create-survey/survey-final-overview/survey-final-overview.component";
import {AnswerSurveyOverviewComponent} from "./components/answer-survey/answer-survey-overview/answer-survey-overview.component";
import {AnswerSurveyParticipationComponent} from "./components/answer-survey/answer-survey-participation/answer-survey-participation.component";
import {AppHeaderComponent} from "./components/header/app-header.component";
import {AppFooterComponent} from "./components/footer/app-footer.component";
import {AnswerQuestionGroupComponent} from "./components/answer-survey/answer-question-group/answer-question-group.component";
import {ThankYouComponent} from "./components/answer-survey/thank-you/thank-you.component";
import {ResultsOverviewComponent} from "./components/view-results/results-overview/results-overview.component";
import {ResultsSearchComponent} from "./components/view-results/results-search/results-search.component";
import {SurveyCreationComponent} from "./components/create-survey/survey-creation/survey-creation.component";
import {AnswerSurveyComponent} from "./components/answer-survey/answer-survey/answer-survey.component";
import {QuestionGroupDeleteComponent} from "./components/create-survey/question-group/question-group-delete/question-group-delete.component";
import {QuestionGroupUpdateComponent} from "./components/create-survey/question-group/question-group-update/question-group-update.component";
import {QuestionDeleteComponent} from "./components/create-survey/question/question-delete/question-delete.component";
import {QuestionUpdateComponent} from "./components/create-survey/question/question-update/question-update.component";
import {CheckboxDeleteComponent} from "./components/create-survey/checkbox/checkbox-delete/checkbox-delete.component";
import {DateValidationDirective} from "./directives/date-validation.directive";
import {MinMaxSelectValidationDirective} from "./directives/min-max-select-validation.directive";
import {AnswerTextQuestionComponent} from "./components/answer-survey/answer-question-types/answer-text-question/answer-text-question.component";
import {AnswerRadioQuestionComponent} from "./components/answer-survey/answer-question-types/answer-radio-question/answer-radio-question.component";
import {AnswerMultipleSelectQuestionComponent} from "./components/answer-survey/answer-question-types/answer-multiple-select-question/answer-multiple-select-question.component";
import {ResultsTextQuestionComponent} from "./components/view-results/results-question-types/results-text-question/results-text-question.component";
import {ResultsCheckboxQuestionComponent} from "./components/view-results/results-question-types/results-checkbox-question/results-checkbox-question.component";
import {ResultsCheckboxTextAnswersComponent} from "./components/view-results/results-question-types/results-checkbox-text-answers/results-checkbox-text-answers.component";
import {ResultsQuestionGroupComponent} from "./components/view-results/results-question-group/results-question-group.component";
import {AnswerSubmissionComponent} from "./components/answer-survey/answer-submission/answer-submission.component";
import {SurveySubmissionModalComponent} from "./components/create-survey/survey-submission-modal.component/survey-submission-modal.component";
import {SurveyBasicInformationComponent} from "./components/shared-components/survey-basic-information/survey-basic-information.component";
import {SurveyAccessDetailsComponent} from "./components/create-survey/survey-access-details/survey-access-details.component";

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'createSurvey', component: SurveyCreationComponent},
  {path: 'createSurvey/questions', component: SurveyQuestionAddingComponent},
  {path: 'createSurvey/:id/final', component: SurveyFinalOverviewComponent},
  {path: 'answers/overview', component: AnswerSurveyComponent},
  {path: 'thanks', component: ThankYouComponent},
  {path: 'viewResults', component: ResultsOverviewComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SurveyBasicInformationComponent,
    SurveyAccessDetailsComponent,
    SurveyCreationComponent,
    SurveyBasicsComponent,
    SurveyQuestionAddingComponent,
    QuestionGroupListComponent,
    QuestionGroupAddComponent,
    QuestionGroupUpdateComponent,
    QuestionGroupDeleteComponent,
    QuestionListComponent,
    QuestionAddComponent,
    QuestionUpdateComponent,
    QuestionDeleteComponent,
    CheckboxListComponent,
    CheckboxAddComponent,
    CheckboxDeleteComponent,
    SurveySubmissionComponent,
    SurveySubmissionModalComponent,
    SurveyFinalOverviewComponent,
    AnswerSurveyComponent,
    AnswerSurveyOverviewComponent,
    AnswerSurveyParticipationComponent,
    AnswerSubmissionComponent,
    AnswerQuestionGroupComponent,
    AnswerTextQuestionComponent,
    AnswerRadioQuestionComponent,
    AnswerMultipleSelectQuestionComponent,
    ThankYouComponent,
    ResultsOverviewComponent,
    ResultsSearchComponent,
    ResultsQuestionGroupComponent,
    ResultsTextQuestionComponent,
    ResultsCheckboxQuestionComponent,
    ResultsCheckboxTextAnswersComponent,
    AppHeaderComponent,
    AppFooterComponent,
    DateValidationDirective,
    MinMaxSelectValidationDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
