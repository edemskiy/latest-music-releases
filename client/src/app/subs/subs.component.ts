import { Component, OnInit } from '@angular/core';
import { SubsService } from '../shared/subs.service';
import { IArtist } from '../../../../models/artist.model';
import { ReleaseType, IAlbum } from '../shared/interfaces';

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
  constructor(private subsService: SubsService) {}

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
}
