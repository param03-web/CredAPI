import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-zosale-signup',
  imports: [RouterLink],
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

  private apiUrl = 'http://127.0.0.1:8000/signup';

  constructor(private http: HttpClient) {}

  signup() {
    const payload = {
      username: this.username,
      email: this.email,
      password: this.password
    };

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
