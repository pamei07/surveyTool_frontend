import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./components/home/home.component";
import {SurveyInitialCreationComponent} from "./components/survey-creation/survey-initial-creation.component";
import {SurveyQuestionAddingComponent} from "./components/survey-completion/survey-question-adding.component";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {QuestionGroupFormComponent} from "./components/question-group/question-group-form/question-group-form.component";
import {QuestionGroupListComponent} from "./components/question-group/question-group-list/question-group-list.component";
import {QuestionFormComponent} from "./components/question/question-form/question-form.component";
import {QuestionListComponent} from "./components/question/question-list/question-list.component";
import {CheckboxListComponent} from "./components/checkbox/checkbox-list/checkbox-list.component";
import {SurveySubmissionComponent} from "./components/survey-submission/survey-submission.component";
import {CheckboxFormComponent} from './components/checkbox/checkbox-form/checkbox-form.component';
import {SurveyOverviewComponent} from "./components/survey-overview/survey-overview.component";
import {DateValidatorDirective} from "./directives/validators/date-validator.directive";

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'createSurvey', component: SurveyInitialCreationComponent},
  {path: 'createSurvey/questions', component: SurveyQuestionAddingComponent},
  {path: 'createSurvey/:id/final', component: SurveyOverviewComponent}
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
    DateValidatorDirective
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
