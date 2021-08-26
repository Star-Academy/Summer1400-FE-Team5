import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SongPageComponent } from './song-page/song-page.component';

const routes: Routes = [
  {
    path: '',
    component:HomeComponent
  },
  {
    path: 'song',
    component:SongPageComponent
  },
  {
    path: 'genre',
    loadChildren: () =>
      import('./pages/genres/genres.module').then(m => m.GenresPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
