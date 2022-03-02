import {Component, Input, OnInit} from '@angular/core';
import {Question} from "../../../../../../model/question";
import {AnswerService} from "../../../../../../services/answer/answer.service";
import {Answer} from "../../../../../../model/answer";
import {Option} from "../../../../../../model/option";
import {ApexAxisChartSeries, ApexChart} from 'ng-apexcharts';

@Component({
  selector: 'app-answers-ranking-question',
  templateUrl: './answers-ranking-question.component.html'
})
export class AnswersRankingQuestionComponent implements OnInit {

  @Input() question!: Question;
  @Input() questionIndex!: number;
  answers!: Answer[];
  numberOfUsersAnswering: number = 0;

  // Data for the bar chart:
  series: ApexAxisChartSeries = [];
  chart: ApexChart = {
    height: 350,
    type: 'bar',
    stacked: true,
    stackType: 'normal'
  }
  plotOptions = {
    bar: {
      horizontal: true
    }
  }
  xAxis = {
    categories: ['0']
  }
  tooltip = {
    y: {
      formatter: function (value: any) {
        if (value === 1) {
          return value + ' Stimme'
        } else {
          return value + ' Stimmen';
        }
      }
    },
    x: {
      formatter: function (value: any) {
        let split = value.split('')
        return 'Rang ' + split[split.length - 1];
      }
    }
  }

  get rankingGroup() {
    return this.question.rankingGroup;
  }

  constructor(private answerService: AnswerService) {
  }

  ngOnInit() {
    this.answerService.findAnswersByQuestionId(this.question.id).subscribe(answers => {
      this.answers = answers;

      this.getRankingOfOptions();
    });
  }

  private getRankingOfOptions() {
    let options = this.rankingGroup?.options;
    let noOfOptions = options?.length;
    if (noOfOptions !== undefined) {
      this.setYAxisCategories(noOfOptions);
    }

    options?.forEach((option: Option) => {
      let data = Array(noOfOptions).fill(0);
      this.answers.forEach((answer: Answer) => {
        if (answer.optionId === option.id && answer.rank !== undefined) {
          data[answer.rank - 1]++;
        }
      })
      this.series.push({'name': option.text, 'data': data});
      if (this.numberOfUsersAnswering === 0) {
        this.numberOfUsersAnswering = data.reduce((a, b) => a + b, 0);
      }
    })
  }

  private setYAxisCategories(noOfOptions: number) {
    this.xAxis.categories = Array.apply(null, Array(noOfOptions))
      .map(function (x, i) {
        return '' + (i + 1);
      });

    this.xAxis.categories[0]
      = this.rankingGroup?.highestRated + " - " + this.xAxis.categories[0];
    this.xAxis.categories[noOfOptions - 1]
      = this.rankingGroup?.lowestRated + " - " + this.xAxis.categories[noOfOptions - 1];
  }

  changeStackType() {
    if (this.chart.stackType === '100%') {
      this.chart = {
        height: 350,
        type: 'bar',
        stacked: true,
        stackType: 'normal'
      };
    } else if (this.chart.stackType === 'normal') {
      this.chart = {
        height: 350,
        type: 'bar',
        stacked: true,
        stackType: '100%'
      };
    }
  }
}
