import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import { Genre } from 'src/app/song/genre.interface';
import { SongService } from 'src/app/song/song.service';

@Component({
  selector: 'page-genres',
  templateUrl: './genres.component.html',
  encapsulation: ViewEncapsulation.None
})
export class GenresPage implements OnInit {
  genres$: Observable<Genre[]> | null = null;

  constructor(private songService: SongService) {}

  ngOnInit(): void {
    this.genres$ = this.songService.getGenres();
  }
}
