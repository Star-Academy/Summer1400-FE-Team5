import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Genre } from 'src/app/song/genre.interface';
import { SongService } from 'src/app/song/song.service';

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html'
})
export class GenresComponent implements OnInit {
  genres$: Observable<Genre[]> | null = null;

  constructor(private songService: SongService) {}

  ngOnInit(): void {
    this.genres$ = this.songService.getGenres();
  }
}
