import {Component, Input, OnInit} from '@angular/core';
import {Question} from "../../../../model/question";
import {FormGroup, FormGroupDirective} from "@angular/forms";
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";
import {Option} from "../../../../model/option";

@Component({
  selector: 'app-ranking-question',
  templateUrl: './ranking-question.component.html'
})
export class RankingQuestionComponent implements OnInit {

  @Input() questionGroupIndex!: number;
  @Input() question!: Question;
  @Input() questionIndex!: number;
  disabled: boolean = true;
  parentForm!: FormGroup;

  get options() {
    return this.question.rankingGroup!.options;
  }

  get questionForm() {
    return this.parentForm
      .get('questionGroupsFormArray')
      ?.get(this.questionGroupIndex.toString())
      ?.get(this.questionIndex.toString());
  }

  get rankings() {
    return this.parentForm
      .get('questionGroupsFormArray')
      ?.get(this.questionGroupIndex.toString())
      ?.get(this.questionIndex.toString())
      ?.get('rankings');
  }

  get confirmed() {
    return this.parentForm
      .get('questionGroupsFormArray')
      ?.get(this.questionGroupIndex.toString())
      ?.get(this.questionIndex.toString())
      ?.get('confirmed');
  }

  constructor(private parentFormGroup: FormGroupDirective) {
  }

  ngOnInit() {
    this.parentForm = this.parentFormGroup.control;
  }


  drop($event: CdkDragDrop<Option[]>) {
    moveItemInArray(this.options, $event.previousIndex, $event.currentIndex);
  }

  enableDisableRankingGroup() {
    if (this.disabled) {
      this.disabled = !this.disabled;
    } else {
      let newRankings = new Map<number | undefined, number>();
      this.options.forEach((option, index) => {
        newRankings.set(option.id, index + 1);
      })

      this.rankings?.value.forEach((rankItemForm: any) => {
        rankItemForm.rank = newRankings.get(rankItemForm.optionId);
        console.log(rankItemForm.rank)
      })

      this.confirmed?.setValue(true);

      this.disabled = !this.disabled;
    }
  }
}
