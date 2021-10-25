import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./components/home/home.component";
import {SurveyInitialCreationComponent} from "./components/create-survey/survey-creation/survey-initial-creation.component";
import {SurveyQuestionAddingComponent} from "./components/create-survey/survey-question-adding/survey-question-adding.component";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {QuestionGroupFormComponent} from "./components/create-survey/question-group/question-group-form/question-group-form.component";
import {QuestionGroupListComponent} from "./components/create-survey/question-group/question-group-list/question-group-list.component";
import {QuestionFormComponent} from "./components/create-survey/question/question-form/question-form.component";
import {QuestionListComponent} from "./components/create-survey/question/question-list/question-list.component";
import {CheckboxListComponent} from "./components/create-survey/checkbox/checkbox-list/checkbox-list.component";
import {SurveySubmissionComponent} from "./components/create-survey/survey-submission/survey-submission.component";
import {CheckboxFormComponent} from './components/create-survey/checkbox/checkbox-form/checkbox-form.component';
import {SurveyOverviewComponent} from "./components/create-survey/survey-overview/survey-overview.component";
import {DateValidatorDirective} from "./directives/validators/date-validator.directive";
import {AnswerSurveyOverviewComponent} from "./components/answer-survey/answer-survey-overview/answer-survey-overview.component";
import {AnswerSurveyQuestionGroupComponent} from "./components/answer-survey/answer-survey-question-group/answer-survey-question-group";

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'createSurvey', component: SurveyInitialCreationComponent},
  {path: 'createSurvey/questions', component: SurveyQuestionAddingComponent},
  {path: 'createSurvey/:id/final', component: SurveyOverviewComponent},
  {path: 'answers', component: AnswerSurveyOverviewComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SurveyInitialCreationComponent,
    SurveyQuestionAddingComponent,
    QuestionGroupFormComponent,
    QuestionGroupListComponent,
    QuestionFormComponent,
    QuestionListComponent,
    CheckboxFormComponent,
    CheckboxListComponent,
    SurveySubmissionComponent,
    SurveyOverviewComponent,
    DateValidatorDirective,
    AnswerSurveyOverviewComponent,
    AnswerSurveyQuestionGroupComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
