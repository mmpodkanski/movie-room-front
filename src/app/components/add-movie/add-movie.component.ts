import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/models/movie.model';
import { MovieService } from 'src/app/_services/movie.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.css']
})
export class AddMovieComponent implements OnInit {
  actor!: string;

  movie: Movie = {
    title: '',
    description: '',
    director: '',
    producer: '',
    category: '',
  }
  actors: Array<string> = [];

  constructor(
    private movieService: MovieService,
    private tokenService: TokenStorageService 
    ) { }

  ngOnInit(): void {
  }


  addActor(): void {
    this.actors.push(this.actor);
    console.log(this.actors);
  }

  saveMovie(): void {
    // const id = this.tokenService.getUser().id;
    const data = {
      title: this.movie.title,
      description: this.movie.description,
      director: this.movie.director,
      producer: this.movie.producer,
      category: this.movie.category,
      actors: this.actors
    };

    this.movieService.create(data)
      .subscribe(
        response => {
          console.log(response);
      });

  };

}
