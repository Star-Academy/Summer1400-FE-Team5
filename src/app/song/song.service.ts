import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Song } from './song.interface';
import { Genre } from './genre.interface';

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
  private genres = ['پاپ', 'جاز', 'راک', 'سنتی'];

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
  }: SongListOption = {}): Observable<Song[]> {
    return this.http
      .post<{ songs: Song[] }>('/song/page', {
        size,
        current: page,
        sorter,
        desc
      })
      .pipe(map(res => res.songs));
  }

  getGenres(): Observable<Genre[]> {
    return this.getSongList({ size: this.genres.length * 10 }).pipe(
      map(songs => {
        const genres = [];
        const songPerGenre = Math.floor(songs.length / this.genres.length);

        for (let i = 0; i < this.genres.length; i++) {
          genres.push({
            genre: this.genres[i],
            songs: songs.slice(0, songPerGenre)
          });

          songs = songs.slice(songPerGenre);
        }

        return genres;
      })
    );
  }
}
