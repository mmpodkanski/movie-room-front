import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from 'src/app/models/movie.model';
import { Actor } from 'src/app/models/actor.model';
import { MovieService } from 'src/app/_services/movie.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {
  currentActor: Actor = {
    firstName: '',
    lastName: '',
    birthDate: '',
  };

  currentMovie: Movie = {
    title: '',
    description: '',
    director: '',
    producer: '',
    category: '',
    actors: [this.currentActor]
  };

  

  errorMsg?: string;

  constructor(
    private movieService: MovieService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getMovie(this.route.snapshot.params.id)
  }

  getMovie(id: string): void {
    this.movieService.get(id)
      .subscribe(
        data => {
          this.currentMovie = data;
        },
        (error) => {
          console.log(error.error);
        }

      );
  }


}
