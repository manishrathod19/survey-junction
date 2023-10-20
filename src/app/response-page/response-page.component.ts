import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { CommunicationService } from '@src/services/communication.service';

@Component({
  selector: 'app-response-page',
  templateUrl: './response-page.component.html',
  styleUrls: ['./response-page.component.css'],
})
export class ResponsePageComponent implements OnInit {
  questionNumber = 0;
  firstStep = 0;
  steps: number = 0;
  totalQuestions = 0;
  formId: any;
  formData: any;
  response: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private comm: CommunicationService
  ) {}

  ngOnInit() {
    const snapshot: ActivatedRouteSnapshot = this.activatedRoute.snapshot;
    this.formId = snapshot.params['formId'];

    this.comm.getForm(this.formId).subscribe({
      next: (response: any) => {
        console.log('data', response);
        this.formData = response.data;
        this.response = this.formData.questions.map((question: any) => {
          return { question: question.value, qId: question.name };
        });
        this.totalQuestions = this.formData.questions.length;
      },
      error(err) {
        console.log('err', err);
      },
    });
  }

  getVoiceOutput(result: any, qIndex: number) {
    console.log('result', result);
    this.response[qIndex].answer = result;
  }

  getLocation(location: any, qIndex: number) {
    console.log('result', location);
    this.response[
      qIndex
    ].answer = `https://www.google.com/maps/search/?api=1&query=${location.lat},${location.long}`;
  }

  onSubmit() {
    console.log('response', this.response);
    this.comm.submitResponse(this.formId, this.response).subscribe({
      next: (res) => {
        console.log('submit response res ', res);
      },
      error(err) {
        console.log('submit response error ', err);
      },
    });
  }

  onNext() {
    this.questionNumber = this.questionNumber + 1;
    if (this.questionNumber == 1) {
      this.firstStep = 100 / this.totalQuestions;
      this.steps = this.firstStep;
    } else {
      this.steps = this.steps + this.firstStep;
    }
  }
}
