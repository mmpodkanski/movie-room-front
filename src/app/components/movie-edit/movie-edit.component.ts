import { Component, Injector, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActorReq } from 'src/app/models/actor.model';
import { Movie } from 'src/app/models/movie.model';
import { MovieService } from 'src/app/_services/movie.service';
import { NotificationService } from 'src/app/_services/notification.service';

@Component({
  selector: 'app-movie-edit',
  templateUrl: './movie-edit.component.html',
  styleUrls: ['./movie-edit.component.css']
})
export class MovieEditComponent implements OnInit {
  firstName: string = '';
  lastName: string = '';

  actors: Array<ActorReq> = [];

  currentMovie: Movie = {
    id: '',
    releaseDate: '',
    title: '',
    description: '',
    director: '',
    writer: '',
    category: '',
    actors: [],
    comments: [],
    imgLogoUrl: '',
    imgBackUrl: ''
  };

  movieId: string = '';

  constructor(
    private movieService: MovieService,
    private route: ActivatedRoute,
    private router: Router,
    private injector: Injector
  ) {}
  

  ngOnInit(): void {
    this.movieId = this.route.snapshot.params.id;
    this.getMovie(this.movieId);
  }

  initActors(oldActors: any) {
    for (let i = 0; i < oldActors.length; i++) {
      let actor = new ActorReq();
      actor.firstName = oldActors[i].firstName;
      actor.lastName = oldActors[i].lastName;
      this.actors.push(actor);
    }
  }


  getMovie(id: string): void {
    this.movieService.get(id)
      .subscribe(
        data => {
          this.currentMovie = data;
          this.initActors(data.actors);
      });
  }

  addActor(): void {
    let size = this.actors.length;
    if (size > 0) {
      if (this.actors[size-1].firstName === '' || this.actors[size-1].lastName === '') {
        throw Error('Wypełnij pola, lub je usuń !');
      }
    }
    

    let actor = new ActorReq();
    actor.firstName = '';
    actor.lastName = '';
    this.actors.push(actor);
    console.log(this.actors);
  }

  removeActor(index: any): void {
    this.actors.splice(index, 1);
    // console.log(this.actors);
  }


  editMovie(): void {
    const notifier = this.injector.get(NotificationService);
    const data = {
      title: this.currentMovie.title,
      description: this.currentMovie.description,
      director: this.currentMovie.director,
      writer: this.currentMovie.writer,
      category: this.currentMovie.category,
      actors: this.actors,
      releaseDate: this.currentMovie.releaseDate,
      imgLogoUrl: this.currentMovie.imgLogoUrl,
      imgBackUrl: this.currentMovie.imgBackUrl
    };

    this.movieService.updateMovie(this.movieId, data)
      .subscribe(
        req => {
          this.router.navigate([`/movies/${this.movieId}`])
          notifier.showSuccess('Film został zaktualizowany!');
      });
  };

}
