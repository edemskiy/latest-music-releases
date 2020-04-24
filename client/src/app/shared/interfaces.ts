export interface LoginResponse {
  token: string;
  username: string;
}

export interface IAlbum {
  id: number;
  title: string;
  link: string;
  cover: string;
  cover_medium: string;
  release_date: string;
  record_type: ReleaseType;
  explicit_lyrics: boolean;
  artistName: string;
  artistId: number;
}

export type ReleaseType = '' | 'single' | 'album';
