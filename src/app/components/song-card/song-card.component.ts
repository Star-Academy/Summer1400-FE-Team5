import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-song-card',
  templateUrl: './song-card.component.html',
  styleUrls: ['./song-card.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SongCardComponent {
  @Input()
  id!: number;

  @Input()
  name!: string;

  @Input()
  artist!: string;

  @Input()
  cover!: string;
}
