import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GenresPage } from './genres.component';

const routes: Routes = [{ path: '', component: GenresPage }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GenresRoutingModule {}
