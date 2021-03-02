import { Component, Injector, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  actor!: string;

  movie: Movie = {
    title: '',
    description: '',
    director: '',
    producer: '',
    category: '',
    imageUrl: ''
  }
  actors: Array<string> = [];

  constructor(
    private movieService: MovieService,
    private router: Router,
    private injector: Injector
    ) { }

  ngOnInit(): void {
  }


  addActor(): void {
    this.actors.push(this.actor);
    console.log(this.actors);
  }

  saveMovie(): void {
    const notifier = this.injector.get(NotificationService);
    const data = {
      title: this.movie.title,
      description: this.movie.description,
      director: this.movie.director,
      producer: this.movie.producer,
      category: this.movie.category,
      imageUrl: this.movie.imageUrl,
      actors: this.actors
    };

    this.movieService.create(data)
      .subscribe(
        data => {
          this.router.navigate([`/movies`]);
          notifier.showSuccess('Movie has been added!');
      });

  };

}
