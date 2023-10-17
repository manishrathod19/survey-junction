import { Component } from '@angular/core';
import { CommunicationService } from '@src/services/communication.service';

interface User {
  name: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  errorMessage = '';
  successMessage = '';
  currentRef: any;
  userDate: User = { name: '', email: '', password: '', confirmPassword: '' };
  showSuccessDialog = false;
  constructor(private comm: CommunicationService) {}

  register() {
    const user = { ...this.userDate };
    delete user.confirmPassword;

    this.comm.registerUser(user).subscribe({
      next: (response) => {
        console.log('register response - ', response);
        this.showSuccessDialog = true;
        this.errorMessage = '';
        this.successMessage = response.message;
      },
      error: (err) => {
        console.log('register err - ', err);
        this.errorMessage = err.error?.message;
      },
    });
  }
}
