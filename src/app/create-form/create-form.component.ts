import { Component } from '@angular/core';
import { AudioRecordingService } from '../audio-record.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.css'],
})
export class CreateFormComponent {
  // Voice recording variables
  isRecording = false;
  recordedTime: any;
  blobUrl: any;
  teste: any;

  questionSelection: any = null;
  questionTypes = [
    { name: 'Text', value: 'text' },
    { name: 'Multiple Choice', value: 'multipleChoice' },
    { name: 'Checkbox', value: 'checkbox' },
    { name: 'Voice', value: 'voice' },
    { name: 'Star Rating', value: 'starRating' },
    { name: 'Location', value: 'location' },
  ];
  formGroups: any[] = [];
  multipleChoiceOptions: any[] = [
    {
      name: 'option1',
    },
  ];

  constructor(
    private audioRecordingService: AudioRecordingService,
    private sanitizer: DomSanitizer
  ) {
    // Voice recording code
    this.audioRecordingService
      .recordingFailed()
      .subscribe(() => (this.isRecording = false));
    this.audioRecordingService
      .getRecordedTime()
      .subscribe((time) => (this.recordedTime = time));
    this.audioRecordingService.getRecordedBlob().subscribe((data) => {
      this.teste = data;
      this.blobUrl = this.sanitizer.bypassSecurityTrustUrl(
        URL.createObjectURL(data.blob)
      );
    });
  }

  /*
  @def: Method to add question dynamically
  @parameters:
    select: template variable to get the selected value
  */
  addQuestion(select: any) {
    this.formGroups.push({
      name: 'formGroup' + this.formGroups.length + 1,
      type: this.questionSelection,
    });

    // Reset the dropdown
    select.value = null;
  }

  addOptionInMultipleChoice() {
    this.multipleChoiceOptions.push({
      name: 'option' + this.multipleChoiceOptions.length + 1,
    });
  }

  startRecording() {
    if (!this.isRecording) {
      this.isRecording = true;
      this.audioRecordingService.startRecording();
    }
  }

  abortRecording() {
    if (this.isRecording) {
      this.isRecording = false;
      this.audioRecordingService.abortRecording();
    }
  }

  stopRecording() {
    if (this.isRecording) {
      this.audioRecordingService.stopRecording();
      this.isRecording = false;
    }
  }

  clearRecordedData() {
    this.blobUrl = null;
  }

  ngOnDestroy(): void {
    this.abortRecording();
  }

  download(): void {
    const url = window.URL.createObjectURL(this.teste.blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = this.teste.title;
    link.click();
  }
}
