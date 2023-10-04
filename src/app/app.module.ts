// Angular imports
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Angular material imports
import { MatButtonModule } from "@angular/material/button";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { MatCardModule } from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';

// Components and module imports
import { AppRoutingModule } from './app-routing.module';
import { AudioRecordingService } from './audio-record.service';
import { CreateFormComponent } from './create-form/create-form.component';
import { HomeComponent } from './home/home.component';
import { AppComponent } from './app.component';
import { NgFor, NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    CreateFormComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, MatToolbarModule, MatButtonModule, MatIconModule, BrowserAnimationsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatSelectModule, ReactiveFormsModule, NgFor, NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault, FormsModule      
  ],
  providers: [AudioRecordingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
