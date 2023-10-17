import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommunicationService } from '@src/services/communication.service';

interface User {
  email: string;
  password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  errorMessage = '';
  userDate: User = { email: '', password: '' };

  constructor(private comm: CommunicationService, private router: Router) {}
  login() {
    this.comm.login(this.userDate).subscribe({
      next: (data) => {
        console.log('login response - ', data);
        localStorage.setItem('userId', data.id);
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.log('login err - ', err);
        this.errorMessage = err.error?.message;
      },
    });
  }
}
