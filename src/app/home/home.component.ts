import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  showFormModal = false;
  constructor(private router: Router) {}

  showDialog() {
    this.showFormModal = true;
  }

  createManually() {
    this.router.navigate(['/createForm']);
  }
}
