import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class SubsService {
  constructor(private http: HttpClient, private auth: AuthService) {}

  getSubs() {
    return this.http.get('/api/subs', {
      headers: {
        auth: this.auth.token,
      },
    });
  }
}
