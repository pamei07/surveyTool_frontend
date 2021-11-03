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
import {SurveyOverviewComponent} from "./components/create-survey/survey-overview/survey-overview.component";
import {AnswerSurveyOverviewComponent} from "./components/answer-survey/answer-survey-overview/answer-survey-overview.component";
import {AnswerSurveyParticipationComponent} from "./components/answer-survey/answer-survey-participation/answer-survey-participation.component";
import {AppHeaderComponent} from "./components/header/app-header.component";
import {AppFooterComponent} from "./components/footer/app-footer.component";
import {AnswerQuestionListComponent} from "./components/answer-survey/answer-question-list/answer-question-list.component";
import {ThankYouComponent} from "./components/answer-survey/thank-you/thank-you.component";
import {ResultsOverviewComponent} from "./components/view-results/results-overview/results-overview.component";
import {ResultsSearchComponent} from "./components/view-results/results-search/results-search.component";
import {ResultsQuestionWithAnswersComponent} from "./components/view-results/results-questions-with-answers/results-question-with-answers.component";
import {SurveyCreationComponent} from "./components/create-survey/survey-creation/survey-creation.component";
import {AnswerSurveyParentComponent} from "./components/answer-survey/answer-survey-parent/answer-survey-parent.component";
import {QuestionGroupDeleteComponent} from "./components/create-survey/question-group/question-group-delete/question-group-delete.component";
import {QuestionGroupUpdateComponent} from "./components/create-survey/question-group/question-group-update/question-group-update.component";
import {QuestionDeleteComponent} from "./components/create-survey/question/question-delete/question-delete.component";
import {QuestionUpdateComponent} from "./components/create-survey/question/question-update/question-update.component";
import {CheckboxDeleteComponent} from "./components/create-survey/checkbox/checkbox-delete/checkbox-delete.component";
import {DateValidationDirective} from "./directives/date-validation.directive";
import {MinMaxSelectValidationDirective} from "./directives/min-max-select-validation.directive";

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'createSurvey', component: SurveyCreationComponent},
  {path: 'createSurvey/questions', component: SurveyQuestionAddingComponent},
  {path: 'createSurvey/:id/final', component: SurveyOverviewComponent},
  {path: 'answers/overview', component: AnswerSurveyParentComponent},
  {path: 'thanks', component: ThankYouComponent},
  {path: 'viewResults', component: ResultsOverviewComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
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
    SurveyOverviewComponent,
    AnswerSurveyParentComponent,
    AnswerSurveyOverviewComponent,
    AnswerSurveyParticipationComponent,
    AnswerQuestionListComponent,
    ThankYouComponent,
    ResultsOverviewComponent,
    ResultsSearchComponent,
    ResultsQuestionWithAnswersComponent,
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
