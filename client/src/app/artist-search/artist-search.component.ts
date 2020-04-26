import { Component, OnInit } from '@angular/core';
import { IArtist } from '../../../../models/artist.model';
import { ArtistsService } from '../shared/artists.service';

@Component({
  selector: 'app-artist-search',
  templateUrl: './artist-search.component.html',
  styleUrls: ['./artist-search.component.scss'],
})
export class ArtistSearchComponent implements OnInit {
  searchResults: IArtist[] = [];
  subscriptionsIds: number[] = [];
  seacrhTimeout: NodeJS.Timeout;
  constructor(private artistsService: ArtistsService) {}

  ngOnInit(): void {
    this.artistsService
      .getArtists()
      .subscribe((res: { artists: IArtist[] }) => {
        this.subscriptionsIds = res.artists.map((artist) => artist.id);
      });
  }

  searchForArtist(query: string) {
    clearTimeout(this.seacrhTimeout);
    if (!query) {
      return;
    }

    this.seacrhTimeout = setTimeout(() => {
      this.artistsService.searchForArtist(query).subscribe((res: any) => {
        this.searchResults = res.artists.slice(0, 10);
      });
    }, 800);
  }

  subscribeToArtist(artist: IArtist) {
    this.subscriptionsIds.push(artist.id);
    this.artistsService
      .subscribeToArtist(artist)
      .subscribe((res) => console.log(res));
  }

  unsubscribeFromAtrist(artistId: number) {
    this.subscriptionsIds = this.subscriptionsIds.filter(
      (id) => id !== artistId
    );
    this.artistsService
      .unsubscribeFromArtist(artistId)
      .subscribe((res) => console.log(res));
  }

  recommendRelatedArtists(artistId: number) {
    this.artistsService.getRealtedArtists(artistId).subscribe((res: any) => {
      const artistsToRecommend = res.artists.filter(
        (artist) =>
          !this.subscriptionsIds.includes(artist.id) &&
          !this.searchResults.map((artist) => artist.id).includes(artist.id)
      );
      const artistIndex = this.searchResults.findIndex(
        (artist) => artist.id === artistId
      );
      this.searchResults.splice(artistIndex + 1, 0, ...artistsToRecommend);
    });
  }

  onArtistClick(artist: IArtist) {
    if (this.subscriptionsIds.includes(artist.id)) {
      this.unsubscribeFromAtrist(artist.id);
    } else {
      this.subscribeToArtist(artist);
      this.recommendRelatedArtists(artist.id);
    }
  }
}
