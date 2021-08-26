import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GenresPage } from './genres.component';
import { GenresTypePage } from './_type/_type.component';

const routes: Routes = [
  { path: '', component: GenresPage },
  { path: ':type', component: GenresTypePage }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GenresRoutingModule {}
