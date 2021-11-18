import {Component, Input, OnInit} from '@angular/core';
import {Survey} from "../../../model/survey";

@Component({
    selector: 'survey-access-details',
    templateUrl: 'survey-access-details.component.html'
})

export class SurveyAccessDetailsComponent implements OnInit {

    @Input() survey!: Survey;

    constructor() {
    }

    ngOnInit() {
    }
}
