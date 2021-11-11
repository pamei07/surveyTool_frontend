import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'answers-checkbox-question-pie-chart',
  templateUrl: 'answers-checkbox-question-pie-chart.component.html'
})

export class AnswersCheckboxQuestionPieChartComponent implements OnInit {

  @Input() data?: Object[];

  view: [number, number] = [820, 400];

  // Pie chart options
  gradient: boolean = true;
  showLegend: boolean = false;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  legendPosition: string = 'below';

  ngOnInit(): void {

  }

  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
}
