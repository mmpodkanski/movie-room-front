import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from 'src/app/models/movie.model';
import { MovieService } from 'src/app/_services/movie.service';
import { PublicApiService } from 'src/app/_services/public-api.service'

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.css']
})
export class MoviesListComponent implements OnInit {
  movies?: Movie[];
  news: string = '';

  constructor(
    private movieService: MovieService,
    private publicApi: PublicApiService,
    private router: Router
    ) { }

ngOnInit(): void {
  this.retrieveMovies();
  this.retrieveNews();
}

retrieveMovies(): void {
  this.movieService.getAll()
    .subscribe(
      data => {
        this.movies = data;
        console.log(data);
      });
}

retrieveNews(): void {
  this.publicApi.getNews().subscribe(
    data => {
      this.news =  data;
    },
    err => {
      this.news =  JSON.parse(err.error).message;
    }
  );
}

goToMovie(movie: Movie): void {
  this.router.navigate([`/movies/${movie.id}`]);
}

}
