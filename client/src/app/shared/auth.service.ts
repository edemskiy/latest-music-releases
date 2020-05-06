import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { LoginResponse } from './interfaces';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  get token() {
    return localStorage.getItem('token');
  }

  private setToken(response: LoginResponse) {
    localStorage.setItem('token', response.token);
  }

  isLoggedIn() {
    return Boolean(this.token);
  }

  register(login: string, password: string) {
    return this.http.post('/api/auth/register', { login, password }).pipe(tap(this.setToken));
  }
  login(login: string, password: string) {
    return this.http.post('/api/auth/login', { login, password }).pipe(tap(this.setToken));
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
