import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { IArtist } from '../../../../models/artist.model';

@Injectable({
  providedIn: 'root',
})
export class ArtistsService {
  constructor(private http: HttpClient, private auth: AuthService) {}

  getArtists() {
    return this.http.get('api/artists', {
      headers: { auth: this.auth.token },
    });
  }
  searchForArtist(query: string) {
    return this.http.get(`/api/artists/search?name=${query}`, {
      headers: { auth: this.auth.token },
    });
  }

  subscribeToArtist(artist: IArtist) {
    return this.http.post('/api/artists/subscribe', artist, {
      headers: { auth: this.auth.token },
    });
  }

  getRealtedArtists(artistId: number) {
    return this.http.get(`/api/artists/${artistId}/related`, {
      headers: { auth: this.auth.token },
    });
  }
}
