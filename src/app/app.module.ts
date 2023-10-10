// Angular imports
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Angular material imports
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';

// Components and module imports
import { AppRoutingModule } from './app-routing.module';
import { AudioRecordingService } from '../services/audio-record.service';
import { CreateFormComponent } from './create-form/create-form.component';
import { HomeComponent } from './home/home.component';
import { AppComponent } from './app.component';
import {
  NgFor,
  NgIf,
  NgSwitch,
  NgSwitchCase,
  NgSwitchDefault,
} from '@angular/common';
import { ResponsePageComponent } from './response-page/response-page.component';
import { SharedService } from 'src/services/shared.service';
import { VoiceInputComponent } from './shared/voice-input/voice-input.component';
import { LocationInputComponent } from './shared/location-input/location-input.component';

// PrimeNg
import { MenubarModule } from 'primeng/menubar';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { SplitButtonModule } from 'primeng/splitbutton';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { CheckboxModule } from 'primeng/checkbox';
import { InputSwitchModule } from 'primeng/inputswitch';

@NgModule({
  declarations: [
    AppComponent,
    CreateFormComponent,
    HomeComponent,
    ResponsePageComponent,
    VoiceInputComponent,
    LocationInputComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    NgFor,
    NgIf,
    NgSwitch,
    NgSwitchCase,
    NgSwitchDefault,
    FormsModule,
    MatDialogModule,
    MenubarModule,
    AvatarModule,
    AvatarGroupModule,
    InputTextModule,
    InputTextareaModule,
    DropdownModule,
    DialogModule,
    ButtonModule,
    ToastModule,
    SplitButtonModule,
    RadioButtonModule,
    RatingModule,
    CheckboxModule,
    InputSwitchModule,
  ],
  providers: [AudioRecordingService, MessageService, SharedService],
  bootstrap: [AppComponent],
})
export class AppModule {}
