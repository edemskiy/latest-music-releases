import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IArtist } from '../../../../../models/artist.model';

@Component({
  selector: 'app-artists-list',
  templateUrl: './artists-list.component.html',
  styleUrls: ['./artists-list.component.scss'],
})
export class ArtistsListComponent implements OnInit {
  @Input() artists: IArtist[];
  @Output() close = new EventEmitter();
  @Output() pickArtist = new EventEmitter<number>();
  constructor() {}

  ngOnInit(): void {}

  onClose() {
    this.close.emit();
  }

  onArtistClick(artistId: number) {
    this.pickArtist.emit(artistId);
  }
}
