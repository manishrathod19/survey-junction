import { Component } from '@angular/core';
import { SharedService } from '@src/services/shared.service';

@Component({
  selector: 'app-response-page',
  templateUrl: './response-page.component.html',
  styleUrls: ['./response-page.component.css'],
})
export class ResponsePageComponent {
  formData: any;
  response: any;
  constructor() {
    this.formData = JSON.parse(localStorage.getItem('formDetails')!);
    this.response = this.formData.questions.map((question: any) => {
      return { question: question.value };
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
}
