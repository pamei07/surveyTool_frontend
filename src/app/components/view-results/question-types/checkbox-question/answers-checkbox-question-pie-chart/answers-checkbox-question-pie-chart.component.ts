import {Component, Input, OnInit} from '@angular/core';
import {Question} from "../../../../../model/question";

@Component({
  selector: 'answers-checkbox-question-pie-chart',
  templateUrl: 'answers-checkbox-question-pie-chart.component.html'
})

export class AnswersCheckboxQuestionPieChartComponent implements OnInit {

  @Input() question!: Question;
  @Input() votesForCheckboxes!: number[];
  data: Object[] = [];

  view: [number, number] = [820, 400];

  // Pie chart options
  gradient: boolean = true;
  showLegend: boolean = false;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  legendPosition: string = 'below';

  ngOnInit(): void {
    this.createDataForPieChart();
  }

  private createDataForPieChart() {
    this.question.checkboxGroup!.checkboxes!.forEach((checkbox, index) => {
      this.data.push({'name': checkbox.text, 'value': this.votesForCheckboxes[index]});
    })
  }
}
