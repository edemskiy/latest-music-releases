import { Pipe, PipeTransform } from '@angular/core';
import { ReleaseType, IAlbum } from './interfaces';

@Pipe({
  name: 'releases',
})
export class ReleasesPipe implements PipeTransform {
  transform(releases: IAlbum[], releaseFilter: ReleaseType): unknown {
    if (releaseFilter === '') {
      return releases;
    } else {
      return releases.filter((album) => album.record_type === releaseFilter);
    }
  }
}
