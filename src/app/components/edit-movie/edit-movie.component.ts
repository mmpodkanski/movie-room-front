import { Component, Injector, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Actor } from 'src/app/models/actor.model';
import { Movie } from 'src/app/models/movie.model';
import { MovieService } from 'src/app/_services/movie.service';
import { NotificationService } from 'src/app/_services/notification.service';

@Component({
  selector: 'app-edit-movie',
  templateUrl: './edit-movie.component.html',
  styleUrls: ['./edit-movie.component.css']
})
export class EditMovieComponent implements OnInit {
  @Input() currentMovie: Movie = {
    id: '',
    releaseDate: '',
    title: '',
    description: '',
    director: '',
    producer: '',
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


  getMovie(id: string): void {
    this.movieService.get(id)
      .subscribe(
        data => {
          this.currentMovie = data;
      });
  }

  editMovie(): void {
    const notifier = this.injector.get(NotificationService);
    const data = {
      title: this.currentMovie.title,
      description: this.currentMovie.description,
      director: this.currentMovie.director,
      producer: this.currentMovie.producer,
      category: this.currentMovie.category,
      // actors: this.currentMovie.actors,
      releaseDate: this.currentMovie.releaseDate,
      imgLogoUrl: this.currentMovie.imgLogoUrl,
      imgBackUrl: this.currentMovie.imgBackUrl
    };

    this.movieService.updateMovie(this.movieId, data)
      .subscribe(
        req => {
          this.router.navigate([`/movies/${this.movieId}`])
          notifier.showSuccess('Movie has been updated!');
      });
  };

}
