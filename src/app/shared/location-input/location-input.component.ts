import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SharedService } from '@src/services/shared.service';

@Component({
  selector: 'app-location-input',
  templateUrl: './location-input.component.html',
  styleUrls: ['./location-input.component.css'],
})
export class LocationInputComponent {
  // variable to hold the location, if the user clicks on the location icon
  @Output() location = new EventEmitter<any>();

  // variable to hold the location, if the user types in the input field
  @Input() inputLocation = '';
  @Input() required = '';
  constructor(private sharedService: SharedService) {}

  items = [
    {
      label: 'Clear location',
      icon: 'pi pi-times',
      command: () => {
        console.log('Delete');
        this.inputLocation = '';
      },
    },
  ];

  getCurrentLocation() {
    this.sharedService.getPosition().then((pos) => {
      this.location.emit({ lat: pos.lat, long: pos.lng });
      this.inputLocation = `Lat: ${pos.lat}  Long: ${pos.lng}`;
    });
  }
}
