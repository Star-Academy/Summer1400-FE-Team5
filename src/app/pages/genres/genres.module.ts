import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

import { GenresRoutingModule } from './genres-routing.module';
import { GenresPage } from './genres.component';
import { SongCardComponent } from 'src/app/components/song-card/song-card.component';
import { GenreComponent } from 'src/app/components/genre/genre.component';

@NgModule({
  declarations: [GenresPage, SongCardComponent, GenreComponent],
  imports: [CommonModule, GenresRoutingModule, MatButtonModule]
})
export class GenresPageModule {}
