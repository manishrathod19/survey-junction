import {
  Component,
  Inject,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { AudioRecordingService } from '../../services/audio-record.service';
import { DomSanitizer } from '@angular/platform-browser';
import { DropdownChangeEvent } from 'primeng/dropdown';
import { MessageService } from 'primeng/api';
import { SharedService } from 'src/services/shared.service';
import { CommunicationService } from '@src/services/communication.service';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  Router,
} from '@angular/router';

@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class CreateFormComponent implements OnInit {
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
    { name: 'Text', value: 'text', icon: 'edit_note' },
    { name: 'Multiple Choice', value: 'multipleChoice', icon: 'check_circle' },
    { name: 'Checkbox', value: 'checkBox', icon: 'check_box' },
    { name: 'Voice', value: 'voice', icon: 'mic' },
    { name: 'Star Rating', value: 'starRating', icon: 'star' },
    { name: 'Location', value: 'location', icon: 'location_on' },
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

  responsePageLink = 'http://localhost:4200/form';
  formData: { heading: string; description: string; questions: any[] } = {
    heading: '',
    description: '',
    questions: [],
  };

  formId: any;
  userId: any;

  constructor(
    private messageService: MessageService,
    private sharedService: SharedService,
    private comm: CommunicationService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    const snapshot: ActivatedRouteSnapshot = this.activatedRoute.snapshot;

    // Access query parameters

    this.formId = snapshot.params['formId'];
    this.userId = localStorage.getItem('userId');

    console.log('queryParam', this.formId);
    this.responsePageLink = this.responsePageLink.concat(`/${this.formId}`);

    // Call api to create form by formId
    this.comm.createForm(this.formId, this.userId).subscribe({
      next: (data) => {
        console.log('data', data);
      },
      error: (err) => {
        console.log('err', err);
      },
    });
  }

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
  addQuestion(questionType: string) {
    if (questionType) {
      switch (questionType) {
        case 'text':
        case 'starRating':
        case 'voice':
        case 'location':
          this.formData.questions.push({
            name: 'question' + (this.formData.questions.length + 1),
            type: questionType,
            value: '',
            required: false,
          });
          break;
        case 'multipleChoice':
        case 'checkBox':
          this.formData.questions.push({
            name: 'question' + (this.formData.questions.length + 1),
            type: questionType,
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

  createForm() {
    this.visible = true;

    // not needed
    this.sharedService.form = this.formData;

    console.log('formData', this.sharedService.form);

    this.comm.updateForm(this.formId, this.userId, this.formData).subscribe({
      next: (data) => {
        console.log('data updated', data);
      },
      error: (err) => {
        console.log('err', err);
      },
    });

    // not needed now
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
