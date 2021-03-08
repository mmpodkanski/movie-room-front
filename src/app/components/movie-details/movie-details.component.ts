import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from 'src/app/models/movie.model';
import { Actor } from 'src/app/models/actor.model';
import { MovieService } from 'src/app/_services/movie.service';
import { Comment } from 'src/app/models/comment.model';
import { TokenStorageService } from 'src/app/_services/token-storage.service';


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
    firstName: '',
    lastName: '',
    birthDate: ''
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

  // actor: Actor = {
  //   firstName: '',
  //   lastName: '',
  //   birthDate: ''
  // };

  // comment: Comment = {
  //   ownerId: '',
  //   author: '',
  //   title: '',
  //   description: '',
  //   createdAt: ''
  // };


  // currentMovie: Movie = {
  //   title: '',
  //   description: '',
  //   director: '',
  //   producer: '',
  //   category: '',
  //   actors: [this.actor],
  //   comments: [this.comment],
  //   imgLogoUrl: '',
  //   imgBackUrl: ''
  // };

  constructor(
    private movieService: MovieService,
    private tokenStorage: TokenStorageService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getMovie(this.route.snapshot.params.id);
  }

  getMovie(id: string): void {
    this.movieService.get(id)
      .subscribe(
        data => {
          this.currentMovie = data;
      });
  }

  addComment(): void {
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
  };


  reloadPage(): void {
    window.location.reload();
  };


  

}
