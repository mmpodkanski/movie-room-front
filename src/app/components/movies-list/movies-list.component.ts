import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from 'src/app/models/movie.model';
import { MovieService } from 'src/app/_services/movie.service';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.css']
})
export class MoviesListComponent implements OnInit {
  movies?: Movie[];

  constructor(
    private movieService: MovieService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.retrieveMovie()
  }

  retrieveMovie(): void {
    this.movieService.getAll()
      .subscribe(
        data => {
          this.movies = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  goToMovie(id: any): void {
    this.router.navigate([`/movies/${id}`]);
  }

}
