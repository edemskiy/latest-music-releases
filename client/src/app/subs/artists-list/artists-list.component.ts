import {
  Component,
  Input,
  Output,
  EventEmitter,
  HostBinding,
} from '@angular/core';
import { IArtist } from '../../../../../models/artist.model';
import { trigger, transition, animate, style } from '@angular/animations';
@Component({
  selector: 'app-artists-list',
  templateUrl: './artists-list.component.html',
  styleUrls: ['./artists-list.component.scss'],
  animations: [
    trigger('sidebar', [
      transition(':enter', [
        style({ left: '-100%' }),
        animate(300, style({ left: 0 })),
      ]),
      transition(':leave', [animate(300, style({ left: '-100%' }))]),
    ]),
  ],
})
export class ArtistsListComponent {
  @Input() artists: IArtist[];
  @Output() close = new EventEmitter();
  @Output() pickArtist = new EventEmitter<number>();
  @Output() unsubscribe = new EventEmitter<number>();
  @HostBinding('@sidebar') state: string;

  isEditing = false;

  onClose() {
    this.close.emit();
  }

  onEdit() {
    this.isEditing = !this.isEditing;
  }

  onUnsubscribe(artistId: number) {
    this.unsubscribe.emit(artistId);
  }

  onArtistClick(artistId: number = null) {
    this.pickArtist.emit(artistId);
  }
}
