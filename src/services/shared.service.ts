import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  // Form object which will be initialized on creating a form
  form = {};
  constructor() {}

  // Method to copy the string value to the user's device clipboard
  copyToClipboard(text: string): void {
    // Create a temporary input element to hold the text
    const inputElement = document.createElement('input');
    inputElement.value = text;
    document.body.appendChild(inputElement);

    // Select the text in the input element
    inputElement.select();
    inputElement.setSelectionRange(0, text.length);

    // Copy the selected text to the clipboard
    document.execCommand('copy');

    // Remove the temporary input element
    document.body.removeChild(inputElement);
  }

  getPosition(): Promise<any> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (resp) => {
          resolve({ lng: resp.coords.longitude, lat: resp.coords.latitude });
        },
        (err) => {
          reject(err);
        }
      );
    });
  }
}
