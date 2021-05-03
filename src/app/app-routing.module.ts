import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { BoardAdminComponent } from './components/board-admin/board-admin.component';
import { MoviesListComponent } from './components/movies-list/movies-list.component';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { MovieAddComponent } from './components/movie-add/movie-add.component';
import { MovieEditComponent } from './components/movie-edit/movie-edit.component';
import { ActorDetailsComponent } from './components/actor-details/actor-details.component';
import { ActorEditComponent } from './components/actor-edit/actor-edit.component';

const routes: Routes = [
  { path: 'movies', component: MoviesListComponent },
  { path: 'movies/:id', component: MovieDetailsComponent },
  { path: 'add-movie', component: MovieAddComponent },
  { path: 'movies/:id/edit', component: MovieEditComponent },
  { path: 'actors/:id', component: ActorDetailsComponent },
  { path: 'actors/:id/edit', component: ActorEditComponent },
  { path: 'admin/board', component: BoardAdminComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', component: MoviesListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
