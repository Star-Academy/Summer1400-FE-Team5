import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Song } from './song.interface';

interface SongListOption {
  size?: number;
  page?: number;
  sorter?: keyof Song;
  desc?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class SongService {
  constructor(private http: HttpClient) {}

  getSong(id: number): Observable<Song> {
    return this.http
      .get<{ song: Song }>(`/song/one/${id}`)
      .pipe(map(res => res.song));
  }

  getSongList({
    size = 20,
    page = 1,
    sorter,
    desc = false
  }: SongListOption): Observable<Song[]> {
    return this.http
      .post<{ songs: Song[] }>('/song/page', {
        size,
        current: page,
        sorter,
        desc
      })
      .pipe(map(res => res.songs));
  }
}
