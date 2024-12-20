import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { LoginCredentials } from '../../models/login-credentials';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  get email() { return this.loginForm.get('email')?.value }
  get password() { return this.loginForm.get('password')?.value }

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    let userCredentials = new LoginCredentials();
    userCredentials.email = this.email!;
    userCredentials.password = this.password!;

    this.authService.login(userCredentials)
      .then(response => {
        if (this.authService.token) {
          const redirectUrl = this.authService.redirectUrl || '/products';
          this.router.navigateByUrl(redirectUrl);
        }
      })
      .catch(error => {
        console.log(error);
      });
  }
}
