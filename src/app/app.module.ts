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
import {QuestionFormComponent} from "./components/create-survey/question/question-form/question-form.component";
import {QuestionListComponent} from "./components/create-survey/question/question-list/question-list.component";
import {CheckboxListComponent} from "./components/create-survey/checkbox/checkbox-list/checkbox-list.component";
import {SurveySubmissionComponent} from "./components/create-survey/survey-submission/survey-submission.component";
import {CheckboxFormComponent} from './components/create-survey/checkbox/checkbox-form/checkbox-form.component';
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
    QuestionGroupAddComponent,
    QuestionGroupListComponent,
    QuestionGroupUpdateComponent,
    QuestionGroupDeleteComponent,
    QuestionFormComponent,
    QuestionListComponent,
    CheckboxFormComponent,
    CheckboxListComponent,
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
    AppFooterComponent
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
