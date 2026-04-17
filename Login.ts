import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-zosale-login',
  imports: [RouterLink],
  templateUrl: './zosale-login.html',
  styleUrl: './zosale-login.css',
})
export class ZosaleLogin {
showPassword =false;

togglepasswordvisibility() {
this.showPassword=!this.showPassword;
}

  email: string = '';
  password: string = '';

  private apiUrl = 'http://127.0.0.1:8000/login';

  constructor(private http: HttpClient) {}

  login() {
    const payload = {
      email: this.email,
      password: this.password
    };

    this.http.post(this.apiUrl, payload).subscribe({
      next: (response) => {
        console.log('Login success:', response);
      },
      error: (error) => {
        console.error('Login failed:', error);
      }
    });
  }
}
