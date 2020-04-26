import { Component, OnInit } from '@angular/core';
import { SubsService } from '../shared/subs.service';
import { IArtist } from '../../../../models/artist.model';
import { ReleaseType, IAlbum } from '../shared/interfaces';
import { ArtistsService } from '../shared/artists.service';

@Component({
  selector: 'app-subs',
  templateUrl: './subs.component.html',
  styleUrls: ['./subs.component.scss'],
})
export class SubsComponent implements OnInit {
  artists: IArtist[];
  latestReleases: IAlbum[];
  releaseFilter: ReleaseType = '';
  isLoading = true;
  isListOfArtistsVisible = false;
  showAllArtists = true;
  constructor(
    private subsService: SubsService,
    private artistsService: ArtistsService
  ) {}

  ngOnInit(): void {
    this.loadAllLatestReleases();
  }

  setFilter(filter: ReleaseType) {
    this.releaseFilter = filter;
  }

  loadAllLatestReleases() {
    this.subsService.getSubs().subscribe((res: any) => {
      this.artists = res.artists;
      this.latestReleases = res.latest_releases;
      this.isLoading = false;
      this.showAllArtists = true;
    });
  }

  loadArtstReleases(artistId: number | null) {
    this.closeListOfArtists();
    this.isLoading = true;
    if (artistId === null) {
      this.loadAllLatestReleases();
    } else {
      this.artistsService.getArtistReleases(artistId).subscribe((res: any) => {
        this.latestReleases = res.albums;
        this.isLoading = false;
        this.showAllArtists = false;
      });
    }
  }

  unsubscribeFromArtist(artistId: number) {
    this.artists = this.artists.filter((artist) => artist.id !== artistId);
    this.latestReleases = this.latestReleases.filter(
      (album) => album.artistId !== artistId
    );
    this.artistsService
      .unsubscribeFromArtist(artistId)
      .subscribe((res) => console.log(res));
  }

  openListOfArtists() {
    this.isListOfArtistsVisible = true;
  }

  closeListOfArtists() {
    this.isListOfArtistsVisible = false;
  }
}
