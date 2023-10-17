import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';
import * as RecordRTC from 'recordrtc';
import moment from 'moment';
import { Observable, Subject } from 'rxjs';
import { AudioRecordingService } from '@src/services/audio-record.service';
import { DomSanitizer } from '@angular/platform-browser';

interface RecordedAudioOutput {
  blob: Blob;
  title: string;
}

@Component({
  selector: 'app-voice-input',
  templateUrl: './voice-input.component.html',
  styleUrls: ['./voice-input.component.css'],
})
export class VoiceInputComponent implements OnDestroy {
  @Output() result = new EventEmitter<any>();
  isRecording = false;
  recordedTime: any;
  blobUrl: any;
  teste: any;
  downloadFileName = '';
  recordedData = new Blob();
  recordString = '';
  items = [
    {
      label: 'Clear Recording',
      icon: 'pi pi-times',
      command: () => {
        console.log('Delete');
        this.clearRecordedData();
      },
    },
  ];

  private stream: any;
  private recorder: any;
  private interval: any;
  private startTime: any;
  private _recorded = new Subject<RecordedAudioOutput>();
  private _recordingTime = new Subject<string>();
  private _recordingFailed = new Subject<string>();
  @Input() required = '';

  constructor(
    private audioRecordingService: AudioRecordingService,
    private sanitizer: DomSanitizer
  ) {
    this.audioRecordingService
      .recordingFailed()
      .subscribe(() => (this.isRecording = false));
    this.audioRecordingService
      .getRecordedTime()
      .subscribe((time) => (this.recordedTime = time));
    this.audioRecordingService.getRecordedBlob().subscribe((data) => {
      this.teste = data;

      // Use this blob to send it to the server
      this.recordedData = data.blob;
      this.result.emit(data.blob);

      this.downloadFileName = this.teste.title;
      console.log('this.downloadFileName', this.downloadFileName);
      this.blobUrl = this.sanitizer.bypassSecurityTrustUrl(
        URL.createObjectURL(data.blob)
      );
      console.log('blobUrl', this.blobUrl);
    });
  }

  clearRecordedData() {
    this.recordString = '';
    this.blobUrl = null;
    this.downloadFileName = '';
  }

  getRecordedBlob(): Observable<RecordedAudioOutput> {
    return this._recorded.asObservable();
  }

  getRecordedTime(): Observable<string> {
    return this._recordingTime.asObservable();
  }

  recordingFailed(): Observable<string> {
    return this._recordingFailed.asObservable();
  }

  startRecording() {
    if (this.recorder) {
      // It means recording is already started or it is already recording something
      return;
    }

    this._recordingTime.next('00:00');
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((s) => {
        this.stream = s;
        this.record();
      })
      .catch((error) => {
        this._recordingFailed.next('');
      });
  }

  abortRecording() {
    this.stopMedia();
  }

  private record() {
    this.recorder = new RecordRTC.StereoAudioRecorder(this.stream, {
      type: 'audio',
      mimeType: 'audio/webm',
    });

    this.recorder.record();
    this.startTime = moment();
    this.interval = setInterval(() => {
      const currentTime = moment();
      const diffTime = moment.duration(currentTime.diff(this.startTime));
      const time =
        this.toString(diffTime.minutes()) +
        ':' +
        this.toString(diffTime.seconds());
      this._recordingTime.next(time);
    }, 1000);
  }

  private toString(value: any) {
    let val = value;
    if (!value) val = '00';
    if (value < 10) val = '0' + value;
    return val;
  }

  stopRecording() {
    if (this.recorder) {
      this.recorder.stop(
        (blob: any) => {
          if (this.startTime) {
            const mp3Name = encodeURIComponent(
              'audio_' + new Date().getTime() + '.mp3'
            );
            this.stopMedia();
            this._recorded.next({ blob: blob, title: mp3Name });
          }
        },
        () => {
          this.stopMedia();
          this._recordingFailed.next('');
        }
      );
    }
  }

  private stopMedia() {
    if (this.recorder) {
      this.recorder = null;
      clearInterval(this.interval);
      this.startTime = null;
      if (this.stream) {
        this.stream.getAudioTracks().forEach((track: any) => track.stop());
        this.stream = null;
      }
    }
  }

  startAudioRecording() {
    if (this.isRecording) {
      this.recordString = '';
      this.audioRecordingService.stopRecording();
      this.isRecording = false;
    } else {
      this.isRecording = true;
      this.recordString = 'Recording...';
      this.audioRecordingService.startRecording();
    }
  }

  ngOnDestroy() {
    this.abortRecording();
  }
}
