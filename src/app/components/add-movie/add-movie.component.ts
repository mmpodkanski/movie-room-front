import { Component, Injector, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Actor, ActorReq } from 'src/app/models/actor.model';
import { Movie } from 'src/app/models/movie.model';
import { MovieService } from 'src/app/_services/movie.service';
import { NotificationService } from 'src/app/_services/notification.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.css']
})
export class AddMovieComponent implements OnInit {

  firstName: string = '';
  lastName: string = '';

  hasAdminRole = false;

  movie: Movie = {
    id: '',
    title: '',
    description: '',
    director: '',
    producer: '',
    category: '',
    releaseDate: '',
    actors: [],
    comments: [],
    imgLogoUrl: '',
    imgBackUrl: ''
  }

  // actor: ActorReq = {
  //   firstName: '',
  //   lastName: ''
  // };

  actors: Array<ActorReq> = [];




  constructor(
    private movieService: MovieService,
    private tokenStorage: TokenStorageService,
    private router: Router,
    private injector: Injector
    ) { }

  ngOnInit(): void {
    const user = this.tokenStorage.getUser();
    this.hasAdminRole = user.role.includes('ROLE_ADMIN');
  }


  addActor(): void {
    let actor = new ActorReq();
    actor.firstName = this.firstName;
    actor.lastName = this.lastName;
    this.actors.push(actor);
    console.log(this.actors);
  }

  removeActor(index: any): void {
    this.actors.splice(index, 1);
    console.log(this.actors);
  }


  saveMovie(): void {
    const notifier = this.injector.get(NotificationService);
    const data = {
      title: this.movie.title,
      description: this.movie.description,
      director: this.movie.director,
      producer: this.movie.producer,
      releaseDate: this.movie.releaseDate,
      category: this.movie.category,
      imgLogoUrl: this.movie.imgLogoUrl,
      imgBackUrl: this.movie.imgBackUrl,
      actors: this.actors
    };

    this.movieService.createMovie(data)
      .subscribe(
        resp => {
          this.router.navigate([`/movies`]);
          if (this.hasAdminRole) {
            // notifier.showSuccess('Movie has been added!');
            notifier.showSuccess('Film został dodany!');
          } else {
            // notifier.showSuccess('Movie has been send to accept list!');
            notifier.showSuccess('Film został dodany do listy oczekujących!');
          }
      });

  };

}
