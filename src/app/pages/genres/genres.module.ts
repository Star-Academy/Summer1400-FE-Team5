import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

import { GenresRoutingModule } from './genres-routing.module';
import { GenresPage } from './genres.component';
import { GenresTypePage } from './_type/_type.component';
import { SongCardComponent } from 'src/app/components/song-card/song-card.component';
import { GenreComponent } from 'src/app/components/genre/genre.component';
import { RoundLayoutModule } from 'src/app/layouts/round/round.module';

@NgModule({
  declarations: [GenresPage, GenresTypePage, SongCardComponent, GenreComponent],
  imports: [
    CommonModule,
    GenresRoutingModule,
    MatButtonModule,
    RoundLayoutModule
  ]
})
export class GenresPageModule {}
