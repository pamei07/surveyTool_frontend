import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./components/home/home.component";
import {SurveyBasicInformationFormComponent} from "./components/create-survey/survey-basic-information-form/survey-basic-information-form.component";
import {AddSurveyContentComponent} from "./components/create-survey/add-survey-content/add-survey-content.component";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {QuestionGroupAddComponent} from "./components/create-survey/question-group/question-group-add/question-group-add.component";
import {QuestionGroupListComponent} from "./components/create-survey/question-group/question-group-list/question-group-list.component";
import {QuestionAddComponent} from "./components/create-survey/question/question-add/question-add.component";
import {QuestionListComponent} from "./components/create-survey/question/question-list/question-list.component";
import {CheckboxListComponent} from "./components/create-survey/checkbox/checkbox-list/checkbox-list.component";
import {SurveySubmissionValidationComponent} from "./components/create-survey/survey-submission-validation/survey-submission-validation.component";
import {CheckboxAddComponent} from './components/create-survey/checkbox/checkbox-add/checkbox-add.component';
import {SurveyOverviewComponent} from "./components/view-results/survey-overview/survey-overview.component";
import {SurveyIntroComponent} from "./components/answer-survey/survey-intro/survey-intro.component";
import {ParticipateInSurveyComponent} from "./components/answer-survey/participate-in-survey/participate-in-survey.component";
import {AppHeaderComponent} from "./components/header/app-header.component";
import {AppFooterComponent} from "./components/footer/app-footer.component";
import {QuestionGroupComponent} from "./components/answer-survey/question-group/question-group.component";
import {ThankYouComponent} from "./components/answer-survey/thank-you/thank-you.component";
import {ResultsHeaderComponent} from "./components/view-results/results-header/results-header.component";
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
import {TextQuestionComponent} from "./components/answer-survey/question-types/text-question/text-question.component";
import {RadioQuestionComponent} from "./components/answer-survey/question-types/radio-question/radio-question.component";
import {MultipleSelectQuestionComponent} from "./components/answer-survey/question-types/multiple-select-question/multiple-select-question.component";
import {AnswersTextQuestionComponent} from "./components/view-results/question-types/text-question/answers-text-question/answers-text-question.component";
import {AnswersCheckboxQuestionComponent} from "./components/view-results/question-types/checkbox-question/answers-checkbox-question/answers-checkbox-question.component";
import {CheckboxTextAnswersComponent} from "./components/view-results/question-types/checkbox-question/checkbox-text-answers/checkbox-text-answers.component";
import {ResultsQuestionGroupComponent} from "./components/view-results/results-question-group/results-question-group.component";
import {AnswersSubmissionComponent} from "./components/answer-survey/answers-submission/answers-submission.component";
import {SurveySubmissionModalComponent} from "./components/create-survey/survey-submission-modal/survey-submission-modal.component";
import {SurveyBasicInformationComponent} from "./components/shared-components/survey-basic-information/survey-basic-information.component";
import {SurveyAccessDetailsComponent} from "./components/view-results/survey-access-details/survey-access-details.component";
import {ParticipantsListComponent} from "./components/view-results/participants-list/participants-list.component";
import {AnswersCheckboxQuestionPieChartComponent} from "./components/view-results/question-types/checkbox-question/answers-checkbox-question-pie-chart/answers-checkbox-question-pie-chart.component";
import {NgxChartsModule} from "@swimlane/ngx-charts";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AnswersCheckboxQuestionTableComponent} from "./components/view-results/question-types/checkbox-question/answers-checkbox-question-table/answers-checkbox-question-table.component";
import {SurveyListComponent} from "./components/open-surveys/survey-list/survey-list.component";
import {SurveyNavigationComponent} from "./components/view-results/survey-navigation/survey-navigation.component";

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'createSurvey', component: SurveyCreationComponent},
  {path: 'createSurvey/questions', component: AddSurveyContentComponent},
  {path: 'surveys/:accessId', component: SurveyOverviewComponent},
  {path: 'surveys/:accessId/answers', component: ResultsHeaderComponent},
  {path: 'answers/overview', component: AnswerSurveyComponent},
  {path: 'thanks', component: ThankYouComponent},
  {path: 'surveys', component: SurveyListComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SurveyBasicInformationComponent,
    SurveyAccessDetailsComponent,
    SurveyCreationComponent,
    SurveyBasicInformationFormComponent,
    AddSurveyContentComponent,
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
    SurveySubmissionValidationComponent,
    SurveySubmissionModalComponent,
    SurveyOverviewComponent,
    AnswerSurveyComponent,
    SurveyIntroComponent,
    ParticipateInSurveyComponent,
    AnswersSubmissionComponent,
    QuestionGroupComponent,
    TextQuestionComponent,
    RadioQuestionComponent,
    MultipleSelectQuestionComponent,
    ThankYouComponent,
    SurveyNavigationComponent,
    ResultsHeaderComponent,
    ResultsSearchComponent,
    ResultsQuestionGroupComponent,
    ParticipantsListComponent,
    AnswersTextQuestionComponent,
    AnswersCheckboxQuestionComponent,
    AnswersCheckboxQuestionTableComponent,
    AnswersCheckboxQuestionPieChartComponent,
    CheckboxTextAnswersComponent,
    SurveyListComponent,
    AppHeaderComponent,
    AppFooterComponent,
    DateValidationDirective,
    MinMaxSelectValidationDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    ReactiveFormsModule,
    NgxChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
