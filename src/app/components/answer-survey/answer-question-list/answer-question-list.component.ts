import {Component, Input, OnInit} from '@angular/core';
import {QuestionGroup} from "../../../model/question-group";
import {FormBuilder, FormGroup, FormGroupDirective} from "@angular/forms";
import {AnswerService} from "../../../services/answer/answer.service";

@Component({
  selector: 'answer-question-list',
  templateUrl: 'answer-question-list.component.html'
})

export class AnswerQuestionListComponent implements OnInit {

  @Input() questionGroup!: QuestionGroup;
  @Input() questionGroupIndex!: number;
  parentForm!: FormGroup;

  constructor(private fb: FormBuilder,
              private answerService: AnswerService,
              private parentFormGroup: FormGroupDirective) {
  }

  ngOnInit() {
    this.parentForm = this.parentFormGroup.control;
  }

//
// /**
//  * Create Answer objects for each question on submit.
//  * 1. For checkboxes:
//  *    --> Create an Answer object only if a checkbox has been checked
//  * 2. For text questions:
//  *    --> Create an Answer object only if a text field is not empty
//  */
// onSubmit() {
//   console.log(this.answerForm)
//   let answer: Answer;
//   let currentQuestion: Question = new Question();
//   let currentCheckbox: Checkbox = new Checkbox();
//   this.answers.controls.forEach((input, questionIndex) => {
//     if (input.value instanceof Array) {
//       input.value.forEach((checkbox, checkboxIndex) => {
//         if (checkbox.checked == true || checkbox.checked == 'true') {
//           answer = new Answer();
//
//           if (checkbox.text !== '') {
//             answer.setText(checkbox.text);
//           }
//
//           currentQuestion = this.questionGroup.questions![questionIndex]
//           answer.setQuestion(currentQuestion);
//
//           currentCheckbox = this.questionGroup.questions![questionIndex].checkboxGroup!.checkboxes![checkboxIndex];
//           answer.setCheckbox(currentCheckbox);
//
//           this.answerArray.push(answer)
//         }
//       })
//     } else if (input.value !== '') {
//       answer = new Answer();
//
//       answer.setText(input.value);
//
//       currentQuestion = this.questionGroup.questions![questionIndex]
//       answer.setQuestion(currentQuestion);
//
//       this.answerArray.push(answer);
//     }
//   });
//   console.log(this.answerArray);
//   this.answerService.saveAnswers(this.answerArray).subscribe();
//   this.answerArray = [];
// }
}
