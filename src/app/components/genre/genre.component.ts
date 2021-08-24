import { Component, Input, ViewEncapsulation } from '@angular/core';
import { Song } from 'src/app/song/song.interface';

@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GenreComponent {
  @Input()
  name!: string;

  @Input()
  songs!: Song[];
}
