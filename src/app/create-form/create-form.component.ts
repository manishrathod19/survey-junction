import { Component, Inject, ViewChild, ViewEncapsulation } from '@angular/core';
import { AudioRecordingService } from '../../services/audio-record.service';
import { DomSanitizer } from '@angular/platform-browser';
import { DropdownChangeEvent } from 'primeng/dropdown';
import { MessageService } from 'primeng/api';
import { SharedService } from 'src/services/shared.service';

@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class CreateFormComponent {
  // Voice recording variables
  isRecording = false;
  recordedTime: any;
  blobUrl: any;
  teste: any;
  downloadFileName = '';
  recordedData = new Blob();
  recordString = '';

  selectedQuestion: any = '';
  questionTypes = [
    { name: 'Text', value: 'text' },
    { name: 'Multiple Choice', value: 'multipleChoice' },
    { name: 'Checkbox', value: 'checkBox' },
    { name: 'Voice', value: 'voice' },
    { name: 'Star Rating', value: 'starRating' },
    { name: 'Location', value: 'location' },
  ];

  multipleChoiceOptions: any[] = [
    {
      name: 'option1',
    },
  ];

  formDetails = {
    heading: '',
    description: '',
  };
  visible: boolean = false;

  responsePageLink = 'http://localhost:4200/responsePage/';
  formData: { heading: string; description: string; questions: any[] } = {
    heading: '',
    description: '',
    questions: [],
  };

  constructor(
    private messageService: MessageService,
    private sharedService: SharedService
  ) {}

  save(severity: string) {
    this.messageService.add({
      severity: severity,
      summary: 'Success',
      detail: 'Data Saved',
    });
  }

  /*
  @def: Method to add question dynamically
  @parameters:
    select: template variable to get the selected value
  */
  addQuestion(dropdown: any, event: DropdownChangeEvent) {
    // selected value from the dropdown
    let type = event?.value?.value;

    if (type) {
      switch (type) {
        case 'text':
        case 'starRating':
        case 'voice':
        case 'location':
          this.formData.questions.push({
            name: 'question' + (this.formData.questions.length + 1),
            type: type,
            value: '',
            required: false,
          });
          break;
        case 'multipleChoice':
        case 'checkBox':
          this.formData.questions.push({
            name: 'question' + (this.formData.questions.length + 1),
            type: type,
            value: '',
            required: false,
            options: [
              {
                name: 'option 1',
                value: '',
              },
            ],
          });
          break;
        default:
          break;
      }

      // Reset the dropdown
      dropdown.clear(event);
    }
  }

  // Method to remove a question using index
  removeQuestion(index: number) {
    this.formData.questions.splice(index, 1);
  }

  // Method to remove an option using index from MCQ
  removeMCQOption(questionIndex: number, optionIndex: number) {
    this.formData.questions[questionIndex]?.options.splice(optionIndex, 1);
  }

  // Method to add an option using index from MCQ
  addOptionInMultipleChoice(questionIndex: number) {
    this.formData.questions[questionIndex]?.options.push({
      name:
        'option' + (this.formData.questions[questionIndex]?.options.length + 1),
      value: '',
    });
  }

  showDialog() {
    this.visible = true;
    this.sharedService.form = this.formData;
    console.log('formData', this.sharedService.form);
    localStorage.setItem('formDetails', JSON.stringify(this.formData));
  }

  showInfoToast() {
    this.messageService.add({
      severity: 'info',
      summary: 'Info',
      detail: 'Copied the link to clipboard',
    });
  }

  copyLink() {
    this.sharedService.copyToClipboard(this.responsePageLink);
    this.showInfoToast();
  }

  navigateToResponsePage() {
    // Open the new window with the specified URL
    window.open(this.responsePageLink, '_blank');
  }
}
