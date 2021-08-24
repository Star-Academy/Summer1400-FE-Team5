import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-song-box',
  templateUrl: './song-box.component.html',
  styleUrls: ['./song-box.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SongBoxComponent {
  @Input()
  id!: number;

  @Input()
  name!: string;

  @Input()
  artist!: string;

  @Input()
  cover!: string;
}
