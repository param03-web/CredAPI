import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-zosale-signup',
  standalone: true,
  imports: [RouterLink, FormsModule, ReactiveFormsModule],
  templateUrl: './zosale-signup.html',
  styleUrl: './zosale-signup.css',
})
export class ZosaleSignup {
showPassword =false;

togglepasswordvisibility() {
this.showPassword=!this.showPassword;
}

  username: string='';
  email: string = '';
  password: string = '';

  private apiUrl = 'http://localhost:8000/signup';

  constructor(private http: HttpClient) {}

  signup() {debugger;
    const payload = {
      username: this.username,
      email: this.email,
      password: this.password
    };
    console.log('Payload:', payload);

    this.http.post(this.apiUrl, payload).subscribe({
      next: (response) => {
        console.log('Signup success:', response);
      },
      error: (error) => {
        console.error('Signup failed:', error);
      }
    });
  }
}
