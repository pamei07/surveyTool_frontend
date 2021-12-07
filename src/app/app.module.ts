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
import {SurveySubmissionComponent} from "./components/create-survey/survey-submission/survey-submission.component";
import {CheckboxAddComponent} from './components/create-survey/checkbox/checkbox-add/checkbox-add.component';
import {SurveyOverviewComponent} from "./components/view-results/overview/survey-overview/survey-overview.component";
import {SurveyIntroComponent} from "./components/answer-survey/survey-intro/survey-intro.component";
import {ParticipateInSurveyComponent} from "./components/answer-survey/participate-in-survey/participate-in-survey.component";
import {AppHeaderComponent} from "./components/header/app-header.component";
import {AppFooterComponent} from "./components/footer/app-footer.component";
import {QuestionGroupPageParticipationComponent} from "./components/answer-survey/question-group-page-participation/question-group-page-participation.component";
import {ThankYouComponent} from "./components/answer-survey/thank-you/thank-you.component";
import {SurveyResultsComponent} from "./components/view-results/survey-results/survey-results.component";
import {SearchSurveyComponent} from "./components/results-search/search-survey.component";
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
import {SingleSelectQuestionComponent} from "./components/answer-survey/question-types/single-select-question/single-select-question.component";
import {MultipleSelectQuestionComponent} from "./components/answer-survey/question-types/multiple-select-question/multiple-select-question.component";
import {AnswersTextQuestionComponent} from "./components/view-results/question-types/text-question/answers-text-question/answers-text-question.component";
import {AnswersCheckboxQuestionComponent} from "./components/view-results/question-types/checkbox-question/answers-checkbox-question/answers-checkbox-question.component";
import {CheckboxTextAnswersComponent} from "./components/view-results/question-types/checkbox-question/checkbox-text-answers/checkbox-text-answers.component";
import {AnswersSubmissionComponent} from "./components/answer-survey/answers-submission/answers-submission.component";
import {SurveySubmissionModalComponent} from "./components/create-survey/survey-submission-modal/survey-submission-modal.component";
import {SurveyBasicInformationComponent} from "./components/shared-components/survey-basic-information/survey-basic-information.component";
import {SurveyAccessDetailsComponent} from "./components/view-results/overview/survey-access-details/survey-access-details.component";
import {ParticipantsListComponent} from "./components/view-results/participants-list/participants-list.component";
import {AnswersCheckboxQuestionPieChartComponent} from "./components/view-results/question-types/checkbox-question/answers-checkbox-question-pie-chart/answers-checkbox-question-pie-chart.component";
import {NgxChartsModule} from "@swimlane/ngx-charts";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AnswersCheckboxQuestionTableComponent} from "./components/view-results/question-types/checkbox-question/answers-checkbox-question-table/answers-checkbox-question-table.component";
import {SurveyPaginatorComponent} from "./components/open-surveys/survey-paginator/survey-paginator.component";
import {SurveyNavigationComponent} from "./components/view-results/survey-navigation/survey-navigation.component";
import {SurveyComponent} from "./components/view-results/survey/survey.component";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {QuestionGroupResultsListComponent} from "./components/view-results/results-list/question-group-results-list/question-group-results-list.component";
import {QuestionGroupPageComponent} from './components/view-results/results-paginator/question-group-page/question-group-page.component';
import {QuestionGroupResultsListItemComponent} from "./components/view-results/results-list/question-group-results-list-item/question-group-results-list-item.component";
import {TableOfContentsListComponent} from './components/view-results/results-list/table-of-contents-list/table-of-contents-list.component';
import {TableOfContentsPaginatorComponent} from './components/view-results/results-paginator/table-of-contents-paginator/table-of-contents-paginator.component';
import {QuestionGroupPaginatorParticipationComponent} from "./components/answer-survey/question-group-paginator-participation/question-group-paginator-participation.component";
import {QuestionGroupPaginatorComponent} from "./components/view-results/results-paginator/question-group-paginator/question-group-paginator.component";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {ClipboardModule} from "@angular/cdk/clipboard";


const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'surveys', component: SurveyPaginatorComponent},
  {path: 'surveys/create', component: SurveyCreationComponent},
  {path: 'surveys/participate/:participationId', component: AnswerSurveyComponent},
  {path: 'surveys/:accessId', component: SurveyComponent},
  {path: 'thanks', component: ThankYouComponent}
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
    SurveySubmissionComponent,
    SurveySubmissionModalComponent,
    SurveyOverviewComponent,
    AnswerSurveyComponent,
    SurveyIntroComponent,
    ParticipateInSurveyComponent,
    AnswersSubmissionComponent,
    QuestionGroupPageParticipationComponent,
    TextQuestionComponent,
    SingleSelectQuestionComponent,
    MultipleSelectQuestionComponent,
    ThankYouComponent,
    SurveyComponent,
    SurveyNavigationComponent,
    SurveyResultsComponent,
    SearchSurveyComponent,
    QuestionGroupResultsListComponent,
    ParticipantsListComponent,
    AnswersTextQuestionComponent,
    AnswersCheckboxQuestionComponent,
    AnswersCheckboxQuestionTableComponent,
    AnswersCheckboxQuestionPieChartComponent,
    CheckboxTextAnswersComponent,
    SurveyPaginatorComponent,
    AppHeaderComponent,
    AppFooterComponent,
    DateValidationDirective,
    MinMaxSelectValidationDirective,
    QuestionGroupPaginatorParticipationComponent,
    QuestionGroupResultsListItemComponent,
    QuestionGroupPageComponent,
    TableOfContentsListComponent,
    TableOfContentsPaginatorComponent,
    QuestionGroupPaginatorParticipationComponent,
    QuestionGroupPaginatorComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    ReactiveFormsModule,
    NgxChartsModule,
    NgbModule,
    DragDropModule,
    ClipboardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
