import { Component, Injector, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from 'src/app/models/movie.model';
import { Actor } from 'src/app/models/actor.model';
import { MovieService } from 'src/app/_services/movie.service';
import { Comment } from 'src/app/models/comment.model';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { NotificationService } from 'src/app/_services/notification.service';


@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})

export class MovieDetailsComponent implements OnInit {
  @Input() comment: Comment= {
    ownerId: '',
    author: '',
    title: '',
    description: '',
    createdAt: ''
  };

  @Input() actor: Actor = {
    id: '',
    firstName: '',
    lastName: '',
    birthDate: '',
    imageUrl: ''
  };

  @Input() currentMovie: Movie = {
    id: '',
    releaseDate: '',
    title: '',
    description: '',
    director: '',
    producer: '',
    category: '',
    actors: [this.actor],
    comments: [this.comment],
    imgLogoUrl: '',
    imgBackUrl: ''
  };
  
  errorMsg?: string;
  selected?: boolean;

  constructor(
    private movieService: MovieService,
    private tokenStorage: TokenStorageService,
    private route: ActivatedRoute,
    private injector: Injector
  ) { }

  ngOnInit(): void {
    this.getMovie(this.route.snapshot.params.id);
  }

  getMovie(id: string): void {
    this.movieService.get(id)
      .subscribe(
        data => {
          this.currentMovie = data;
          this.checkAndUpdateCategory();
      });
  }

  addComment(): void {
    const notifier = this.injector.get(NotificationService);
    const userId = this.tokenStorage.getUser().id;
    const data = {
      ownerId: userId,
      title: this.comment.title,
      description: this.comment.description
    };

    this.movieService.createComment(this.currentMovie.id, data)
      .subscribe(
        response => {
          console.log(response);
          this.reloadPage();
        });
    
    var logMe = function () {
      notifier.showSuccess('Komentarz został dodany!');
    };
    
    setTimeout(logMe, 5000);

  };

  checkAndUpdateCategory(): void {
    switch (this.currentMovie.category) {
      case "DRAMA":
        this.currentMovie.category = "DRAMAT";
        break;
      case "ACTION":
        this.currentMovie.category = "AKCJA";
        break;
      case "COMEDY":
        this.currentMovie.category = "KOMEDIA";
        break;
    };
  }


  reloadPage(): void {
    window.location.reload();
  };


  

  

}
