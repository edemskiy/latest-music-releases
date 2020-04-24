import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  authForm = new FormGroup({
    login: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.pattern(/^[\w]+$/),
    ]),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  constructor(public auth: AuthService, private router: Router) {}

  ngOnInit(): void {}

  get login() {
    return this.authForm.get('login');
  }

  get password() {
    return this.authForm.get('password');
  }

  register() {
    if (this.authForm.valid) {
      this.auth
        .register(this.authForm.value.login, this.authForm.value.password)
        .subscribe(() => {
          this.authForm.reset();
          this.router.navigate(['/']);
        });
    }
  }

  signIn() {
    if (this.authForm.valid) {
      this.auth
        .login(this.authForm.value.login, this.authForm.value.password)
        .subscribe(() => {
          this.authForm.reset();
          this.router.navigate(['/']);
        });
    }
  }
}
