import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '@src/services/shared.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  showFormModal = false;
  constructor(private router: Router, private shared: SharedService) {}

  showDialog() {
    this.showFormModal = true;
  }

  createManually() {
    // Create a form id
    const formId = this.shared.generateUniqueId(10);
    console.log('formId', formId);

    // Pass it to the next page
    this.router.navigate(['/editForm', formId]);
  }
}
