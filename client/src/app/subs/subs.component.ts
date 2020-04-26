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
  constructor(
    private subsService: SubsService,
    private artistsService: ArtistsService
  ) {}

  ngOnInit(): void {
    this.subsService.getSubs().subscribe((res: any) => {
      console.log(res);
      this.artists = res.artists;
      this.latestReleases = res.latest_releases;
      this.isLoading = false;
    });
  }

  setFilter(filter: ReleaseType) {
    this.releaseFilter = filter;
  }

  loadArtstReleases(artistId: number = null) {
    this.closeListOfArtists();
    this.isLoading = true;
    this.artistsService.getArtistReleases(artistId).subscribe((res: any) => {
      this.latestReleases = res.albums;
      this.isLoading = false;
    });
  }

  openListOfArtists() {
    this.isListOfArtistsVisible = true;
  }

  closeListOfArtists() {
    this.isListOfArtistsVisible = false;
  }
}
